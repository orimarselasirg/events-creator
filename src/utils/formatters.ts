import moment from "moment"

export const formattedDate = (data: string) => {
  const formatDate = moment(data, 'YYYY-MM-DD').format('D [de] MMM [de] YYYY')
  return formatDate
}

export const isDateBeforeToday = (date: string) => {
  const inputDate = moment(date, 'YYYY-MM-DD');
  const today = moment().startOf('day');
  return inputDate.isBefore(today);
}