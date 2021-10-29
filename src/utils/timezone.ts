import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

export const friendlyTime = function (timeString: string) {
  let tmp = new Date(
    timeString.includes(" ") ? timeString + " Z" : timeString + "Z"
  );
  return moment(tmp).local().fromNow();
};

export const readableTime = function (timeString: string) {
  let tmp = new Date(
    timeString.includes(" ") ? timeString + " Z" : timeString + "Z"
  );
  return tmp.toLocaleString();
};
