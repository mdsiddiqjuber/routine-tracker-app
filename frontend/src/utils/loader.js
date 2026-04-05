let requestCount = 0;
let listeners = [];

export const startLoading = () => {
  requestCount++;
  notify();
};

export const stopLoading = () => {
  requestCount = Math.max(0, requestCount - 1);
  notify();
};

const notify = () => {
  listeners.forEach((cb) => cb(requestCount));
};

export const subscribe = (cb) => {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
};