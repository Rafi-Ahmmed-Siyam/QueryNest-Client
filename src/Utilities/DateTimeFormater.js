
import { format, formatDistanceToNow, differenceInHours } from "date-fns"

export const timeDateFormater = (timeDate) => {
   if (differenceInHours(new Date(), new Date(timeDate)) < 24) {

      const nweResult = formatDistanceToNow(new Date(timeDate), { addSuffix: true })
      return nweResult;
   }
   else {
      const result = format(new Date(timeDate), 'PPpp')
      return result
   }
};