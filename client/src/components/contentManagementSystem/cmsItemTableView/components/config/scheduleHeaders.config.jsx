import { generateHeaderConfig } from "../../helpers/genereateHeaderConfig";
import { CLASS_NARROW, CLASS_NORMAL, CLASS_WIDE, LAYOUT_GROUPED, LAYOUT_SINGLE } from "./index.config";

export const scheduleHeadersConfig = {
  schedule: {
    columnOrder: [
      generateHeaderConfig("delete", LAYOUT_SINGLE, CLASS_NARROW),
      generateHeaderConfig("date", LAYOUT_GROUPED, CLASS_NORMAL, "time"),
      generateHeaderConfig("time", LAYOUT_GROUPED, CLASS_NORMAL, "date"),
      generateHeaderConfig("teamIcon", LAYOUT_SINGLE, CLASS_WIDE),
      generateHeaderConfig(null, LAYOUT_SINGLE, CLASS_WIDE),
      generateHeaderConfig("opponentIcon", LAYOUT_SINGLE, CLASS_WIDE),
      generateHeaderConfig("opponent", LAYOUT_GROUPED, CLASS_WIDE, "location"),
      generateHeaderConfig("location", LAYOUT_GROUPED, CLASS_WIDE, "opponent"),
      generateHeaderConfig(null, LAYOUT_SINGLE, CLASS_WIDE),
      generateHeaderConfig("edit", LAYOUT_SINGLE),
    ],
    additionalEditUiHeaders: [
      generateHeaderConfig("delete", LAYOUT_SINGLE),
      generateHeaderConfig("edit", LAYOUT_SINGLE),
      generateHeaderConfig("teamIcon", LAYOUT_SINGLE),
      generateHeaderConfig(null, LAYOUT_SINGLE, CLASS_WIDE),
    ],
    additionalUiHeaders: [
      generateHeaderConfig("teamIcon", LAYOUT_SINGLE),
      generateHeaderConfig("edit", LAYOUT_SINGLE),
      generateHeaderConfig(null, LAYOUT_SINGLE, CLASS_WIDE),
    ],
  },
};
