export const easeOutExpo = function(elapsed, start, range, duration) {
    return range * (-Math.pow(2, -10 * elapsed / duration) + 1) + start;
};

export const easeInOutExpo = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    t--;
    return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
};

export const easeInOutCubic = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
};

export const easeInQuart = function(t, b, c, d) {
    t /= d;
    return c * t * t * t * t + b;
};

export const easeInCirc = function(t, b, c, d) {
    t /= d;
    return -c * (Math.sqrt(1 - t * t) - 1) + b;
};
