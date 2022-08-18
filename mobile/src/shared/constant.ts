import moment from 'moment';

export const formatTimeAgo = (txt: string) => {
  const value = moment(parseFloat(txt)).fromNow(true);

  return value;
};
