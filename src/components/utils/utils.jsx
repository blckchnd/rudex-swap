import { STATUS } from '@components/StatusMain/constant';

export const mediaMinTablet = 768;
export const mediaMinDesktop = 1024;
export const mediaMaxWidth = 1440;

export const scrollTop = () => {
  window.scrollTo(0, 0);
};

export const scrollToPosition = (position) => {
  window.scrollTo(0, position);
};

export const localiztionHelper = ({ str, params, className = '' }) => {
  const parts = str.split(/({\w+})/g);

  return parts.map((part, index) => {
    const match = part.match(/{(\w+)}/);
    if (!match) return part;

    const key = match[1];
    const param = params[key];
    const value = typeof param === 'object' ? param.value : param || '??';
    const appliedClass =
      typeof param === 'object' ? param.className || className : className;

    return (
      <span key={index} className={appliedClass}>
        {value}
      </span>
    );
  });
};

export const fixTime = (time) => {
  return ('0' + time).slice(-2);
};

export const getTime = (time) => {
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  return hours !== 0
    ? hours + ':' + fixTime(minutes) + ':' + fixTime(seconds)
    : fixTime(minutes) + ':' + fixTime(seconds);
};

export const changeStatusName = ({ name, locales }) => {
  if (name === STATUS.WAITING) {
    return locales.STATUS.WAITING;
  } else if (name === STATUS.CONFIRMING) {
    return locales.STATUS.CONFIRMING;
  } else if (name === STATUS.EXCHANGING) {
    return locales.STATUS.EXCHANGING;
  } else if (name === STATUS.SENDING) {
    return locales.STATUS.SENDING;
  } else if (name === STATUS.FINISHED) {
    return locales.STATUS.FINISHED;
  } else if (name === STATUS.FAILED) {
    return locales.STATUS.FAILED;
  } else if (name === STATUS.REFUNDED) {
    return locales.STATUS.REFUNDED;
  } else if (name === STATUS.OVERDUE) {
    return locales.STATUS.OVERDUE;
  } else {
    return '';
  }
};

export const randomNumber = () => {
  return Math.floor(Math.random() * 100000);
};

export const clickOverlay = ({ classActive, activeType, handleFunc }) => {
  const clickOverlay = (event) => {
    if (event.target.classList.contains(classActive)) {
      handleFunc();
    }
  };
  const clickEscape = (event) => {
    if (event.key === 'Escape') {
      handleFunc();
    }
  };
  if (activeType) {
    window.addEventListener('click', clickOverlay);
    window.addEventListener('keyup', clickEscape);
  }
  return () => {
    window.removeEventListener('click', clickOverlay);
    window.removeEventListener('keyup', clickEscape);
  };
};

export const checkCurrencies = (item) => {
  const network = item?.network?.toUpperCase();
  const label =
    item?.tickerNetwork !== null &&
    item?.ticker?.toUpperCase().includes(item?.tickerNetwork)
      ? item?.ticker?.toUpperCase().replace(item?.tickerNetwork, '')
      : item?.ticker?.toUpperCase();

  return {
    label: label,
    network: network,
  };
};
