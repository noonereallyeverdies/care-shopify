/**
 * Browser-compatible shim for the Node.js os module.
 * This provides minimal implementation for compatibility.
 */

// Basic platform detection
const isMacOS = typeof navigator !== 'undefined' && /mac/i.test(navigator.platform);
const isWindows = typeof navigator !== 'undefined' && /win/i.test(navigator.platform);
const isLinux = typeof navigator !== 'undefined' && /linux/i.test(navigator.platform);

// Minimal implementation
export function platform() {
  if (isWindows) return 'win32';
  if (isMacOS) return 'darwin';
  if (isLinux) return 'linux';
  return 'browser';
}

export function tmpdir() {
  console.warn('os.tmpdir is not implemented in browser environment');
  return '/tmp';
}

export function homedir() {
  console.warn('os.homedir is not implemented in browser environment');
  return '/home/user';
}

export function hostname() {
  console.warn('os.hostname is not implemented in browser environment');
  return 'browser-host';
}

export function cpus() {
  // Try to get logical processors count from navigator
  const cpuCount = navigator?.hardwareConcurrency || 1;
  
  // Return array of cpu info objects (simplified)
  return Array(cpuCount).fill({
    model: 'Browser CPU',
    speed: 1000,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  });
}

export const EOL = isWindows ? '\r\n' : '\n';
export const constants = {
  signals: {},
  errno: {},
  priority: {}
};

// Default export
export default {
  platform,
  tmpdir,
  homedir,
  hostname,
  cpus,
  EOL,
  constants,
}; 