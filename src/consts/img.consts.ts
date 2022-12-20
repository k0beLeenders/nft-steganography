import * as models from "models";

export const TWITTER_PRESET: models.IConversionPreset = {
  height: 400,
  width: 400,
};

export const CONVERSION_PRESET_MAP: {
  [key in models.IConversionPresetType]: models.IConversionPresetMap;
} = {
  NONE: {
    preset: "NONE",
  },
  TWITTER: {
    preset: "TWITTER",
    value: TWITTER_PRESET,
  },
};
