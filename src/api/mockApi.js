import { capitalGainsData, holdingsData } from '../data/mockData';

const delay = (result, shouldFail = false, timeout = 850) =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Unable to load dashboard data right now.'));
        return;
      }

      resolve(structuredClone(result));
    }, timeout);
  });

const shouldMockError = () => new URLSearchParams(window.location.search).has('mockError');

export function fetchCapitalGains() {
  return delay(capitalGainsData, shouldMockError(), 650);
}

export function fetchHoldings() {
  return delay(holdingsData, shouldMockError(), 900);
}