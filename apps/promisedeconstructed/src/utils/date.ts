import dayjs from 'dayjs';
import th from 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale(th);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Bangkok');
dayjs.extend(buddhistEra);

export default dayjs;
