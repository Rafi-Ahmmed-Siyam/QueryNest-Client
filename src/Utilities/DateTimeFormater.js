
import { format, differenceInDays, formatDistanceToNow } from "date-fns"

export const timeDateFormater = (timeDate) => {
   if(differenceInDays(new Date(), new Date(timeDate)) === 1){
      const result = format(new Date(timeDate), 'PPpp')
      return result
   }
   else{
      const nweResult = formatDistanceToNow(new Date(timeDate), { addSuffix: true })
      return nweResult;
   }
};