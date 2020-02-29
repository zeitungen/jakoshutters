// I meanly steal the sources here: https://gist.github.com/wolever/5fd7573d1ef6166e8f8c4af286a69432
/**
 * A LocalStorage-based mutex. Guarantees¹ that only one browser window will be
 * able to execute the code inside the callback at a time.
 *
 * Based on the Alur and Taubenfeld fast lock
 * (http://www.cs.rochester.edu/research/synchronization/pseudocode/fastlock.html)
 * with an added timeout to ensure there will be eventual progress in the event
 * that a window is closed in the middle of the callback.
 *
 * 1. The guarantee assumes that the algorithm is correctly implemented.
 *    Additionally, I'm confident but not certain that this guarantee will hold
 *    in the event of a timeout.
 *
 * Usage:
 *
 *    LocalStorageMutex('some-key', function() {
 *      console.log('I hold the mutex!');
 *    });
 */
export function LocalStorageMutex(key, callback, pollInterval=50, timeout=1000) {
  // See Alur and Taubenfeld's lock:
  // 
  // Note: there have been some slight modifications (moving the X = 1 inside
  // the critical section so it's called every time) which should, hopefully,
  // make a collision in the event of a timeout less likely.
  let localStorage = window.localStorage;
  let i = +(new Date()) + '|' + Math.random();
  let startTime = +(new Date());

  let delay = function(cb) {
    if ((new Date()) - startTime > timeout) {
      console.error(`Timeout waiting for mutex on ${key}; clearing lock.`);
      delete localStorage[key + ':Z'];
      delete localStorage[key + ':Y'];
      loop();
      return;
    }

    setTimeout(cb, pollInterval * (Math.random() + 0.1));
  };

  let waitFor = function(pred, cb) {
    if (!pred()) {
      delay(() => waitFor(pred, cb));
      return;
    }
    cb();
  };

  let getSetY = function() {
    if (localStorage[key + ':Y'])
      return false;
    localStorage[key + ':Y'] = i;
    return true;
  };

  let loop = function() {
    localStorage[key + ':X'] = i;

    waitFor(getSetY, () => {
      if (localStorage[key + ':X'] == i) {
        criticalSection();
        return;
      }

      delay(() => {
        if (localStorage[key = ':Y'] != i) {
          loop();
          return;
        }
        waitFor(() => !localStorage[key + ':Z'], criticalSection);
      });
    });
  };

  let criticalSection = function() {
    localStorage[key + ':Z'] = '1';
    try {
      callback();
    } finally {
      delete localStorage[key + ':Z'];
      if (localStorage[key + ':Y'] == i)
        delete localStorage[key + ':Y'];
      if (localStorage[key + ':X'] == i)
        delete localStorage[key + ':X'];
    }
  };

  loop();
}

function mpAsyncTrack(event, data) {
  LocalStorageMutex('ak-mixpanel-events', () => {
    let events = JSON.parse(localStorage['ak-mixpanel-events'] || '[]');
    events.push({event, data});
    localStorage['ak-mixpanel-events'] = JSON.stringify(events);
  });
}

function mpAsyncFlush() {
  LocalStorageMutex('ak-mixpanel-events', () => {
    let events = JSON.parse(localStorage['ak-mixpanel-events'] || '[]');
    events.forEach(e => {
      window.mixpanel.track(e.event, e.data);
    });
    delete localStorage['ak-mixpanel-events'];
  });
}