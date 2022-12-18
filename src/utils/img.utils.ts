async function loadImg(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = url;
    image.crossOrigin = "annonymous";
    image.onload = () => resolve(image);
    image.onerror = (e) => reject(e);
  });
}

function args(i: number) {
  return i + 1;
}
function messageDelimiter(modMessage: number[], threshold: number): number[] {
  return new Array(threshold * 3).fill(255);
}
function messageCompleted(
  data: Readonly<Uint8ClampedArray>,
  i: number,
  threshold: number
) {
  for (let j = 0; j < 16; j++) {
    if (data[i + j * 4] !== 255) return false;
  }
  return true;
}

function isPrime(n: number) {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
  if (n % 2 === 0) return n === 2;
  if (n % 3 === 0) return n === 3;
  const m = Math.sqrt(n);
  for (let i = 5; i <= m; i += 6) {
    if (n % i === 0) return false;
    if (n % (i + 2) === 0) return false;
  }
  return true;
}

function findNextPrime(n: number) {
  for (let i = n; true; i += 1) {
    if (isPrime(i)) return i;
  }
}

export async function encode(
  message: string,
  image: Readonly<HTMLImageElement>
) {
  const t: number = 3;
  const threshold: number = 1;
  const codeUnitSize: number = 16;
  // Handle image url
  const _image = await ((image) => {
    if (image instanceof HTMLImageElement) {
      return loadImg(image.src);
    }
    throw new Error(
      "IllegalInput: The input image is neither an URL string nor an image."
    );
  })(image);

  const prime = findNextPrime(Math.pow(2, 3));

  if (!t || t < 1 || t > 7) {
    throw new Error(
      'IllegalOptions: Parameter t = " + t + " is not valid: 0 < t < 8'
    );
  }

  const shadowCanvas = document.createElement("canvas");
  const shadowCtx = shadowCanvas.getContext("2d");
  if (shadowCtx === null) {
    throw new Error("NullContext: Context is null");
  }

  shadowCanvas.style.display = "none";
  shadowCanvas.width = _image.width;
  shadowCanvas.height = _image.height;
  shadowCtx.drawImage(_image, 0, 0);
  const imageData = shadowCtx.getImageData(
    0,
    0,
    shadowCanvas.width,
    shadowCanvas.height
  );
  const data = imageData.data;

  // bundlesPerChar ... Count of full t-bit-sized bundles per Character
  // overlapping ... Count of bits of the currently handled character which are not handled during each run
  // dec ... UTF-16 Unicode of the i-th character of the message
  // curOverlapping ... The count of the bits of the previous character not handled in the previous run
  // mask ... The raw initial bitmask, will be changed every run and if bits are overlapping
  const bundlesPerChar = (codeUnitSize / t) >> 0;
  const overlapping = codeUnitSize % t;
  const modMessage: number[] = [];
  let decM: number;
  let oldDec: number = 0;

  for (let i = 0; i <= message.length; i++) {
    const dec = message.charCodeAt(i) || 0;
    const curOverlapping = (overlapping * i) % t;
    if (curOverlapping > 0 && oldDec) {
      // Mask for the new character, shifted with the count of overlapping bits
      let mask = Math.pow(2, t - curOverlapping) - 1;
      // Mask for the old character, i.e. the t-curOverlapping bits on the right
      // of that character
      const oldMask =
        Math.pow(2, codeUnitSize) * (1 - Math.pow(2, -curOverlapping));
      const left = (dec & mask) << curOverlapping;
      const right = (oldDec & oldMask) >> (codeUnitSize - curOverlapping);
      modMessage.push(left + right);

      if (i < message.length) {
        mask = Math.pow(2, 2 * t - curOverlapping) * (1 - Math.pow(2, -t));
        for (let j = 1; j < bundlesPerChar; j++) {
          decM = dec & mask;
          modMessage.push(decM >> ((j - 1) * t + (t - curOverlapping)));
          mask <<= t;
        }
        if ((overlapping * (i + 1)) % t === 0) {
          mask = Math.pow(2, codeUnitSize) * (1 - Math.pow(2, -t));
          decM = dec & mask;
          modMessage.push(decM >> (codeUnitSize - t));
        } else if (((overlapping * (i + 1)) % t) + (t - curOverlapping) <= t) {
          decM = dec & mask;
          modMessage.push(
            decM >> ((bundlesPerChar - 1) * t + (t - curOverlapping))
          );
        }
      }
    } else if (i < message.length) {
      let mask = Math.pow(2, t) - 1;
      for (let j = 0; j < bundlesPerChar; j++) {
        decM = dec & mask;
        modMessage.push(decM >> (j * t));
        mask <<= t;
      }
    }
    oldDec = dec;
  }

  // Write Data
  let offset: number;
  let subOffset: number = 0;
  const delimiter = messageDelimiter(modMessage, threshold);
  for (
    offset = 0;
    (offset + threshold) * 4 <= data.length &&
    offset + threshold <= modMessage.length;
    offset += threshold
  ) {
    let qS: number[] = [];
    for (let i = 0; i < threshold && i + offset < modMessage.length; i++) {
      let q = 0;
      for (
        let j = offset;
        j < threshold + offset && j < modMessage.length;
        j++
      ) {
        q += modMessage[j] * Math.pow(args(i), j - offset);
      }
      qS[i] = 255 - prime + 1 + (q % prime);
    }
    for (
      let i = offset * 4;
      i < (offset + qS.length) * 4 && i < data.length;
      i += 4
    ) {
      data[i + 3] = qS[(i / 4) % threshold];
    }

    subOffset = qS.length;
  }
  // Write message-delimiter
  let index: number;
  for (
    index = offset + subOffset;
    index - (offset + subOffset) < delimiter.length &&
    (offset + delimiter.length) * 4 < data.length;
    index++
  ) {
    data[index * 4 + 3] = delimiter[index - (offset + subOffset)];
  }
  // Clear remaining data
  for (let i = (index + 1) * 4 + 3; i < data.length; i += 4) {
    data[i] = 255;
  }

  shadowCtx.putImageData(
    new ImageData(data, imageData.width, imageData.height),
    0,
    0
  );

  return shadowCanvas.toDataURL();
}

export async function decode(image: Readonly<HTMLImageElement>) {
  // Handle image url
  const _image = await ((image, options) => {
    if (image instanceof HTMLImageElement) {
      return loadImg(image.src);
    }
    throw new Error(
      "IllegalInput: The input image is neither an URL string nor an image."
    );
  })(image);

  const t: number = 3;
  const threshold: number = 1;
  const codeUnitSize: number = 16;
  const prime = findNextPrime(Math.pow(2, t));

  if (!t || t < 1 || t > 7) {
    throw new Error(
      'IllegalOptions: Parameter t = " + t + " is not valid: 0 < t < 8'
    );
  }

  const shadowCanvas = document.createElement("canvas");
  const shadowCtx = shadowCanvas.getContext("2d");
  if (shadowCtx === null) {
    throw new Error("NullContext: Context is null");
  }

  shadowCanvas.style.display = "none";
  shadowCanvas.width = _image.width;
  shadowCanvas.height = _image.height;

  shadowCtx.drawImage(_image, 0, 0);

  const imageData = shadowCtx.getImageData(
    0,
    0,
    shadowCanvas.width,
    shadowCanvas.height
  );
  const data = imageData.data;
  const modMessage: number[] = [];

  if (threshold === 1) {
    for (let i = 3; i < data.length; i += 4) {
      if (messageCompleted(data, i, threshold)) {
        break;
      }
      modMessage.push(data[i] - (255 - prime + 1));
    }
  } else {
    // comment out...
  }

  let message = "";
  let charCode = 0;
  let bitCount = 0;
  let mask = Math.pow(2, codeUnitSize) - 1;
  for (let i = 0; i < modMessage.length; i++) {
    charCode += modMessage[i] << bitCount;
    bitCount += t;
    if (bitCount >= codeUnitSize) {
      message += String.fromCharCode(charCode & mask);
      bitCount %= codeUnitSize;
      charCode = modMessage[i] >> (t - bitCount);
    }
  }
  if (charCode !== 0) {
    message += String.fromCharCode(charCode & mask);
  }

  return message;
}
