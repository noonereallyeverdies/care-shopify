// Test script to verify polyfills are working
import { promises as fs } from 'fs'
import path from 'path'
import { EventEmitter } from 'events'
import crypto from 'crypto'
import process from 'process'

console.log('Testing polyfills...')

// Test EventEmitter
const emitter = new EventEmitter()
console.log('✓ EventEmitter imported')

// Test process
console.log('✓ Process env:', process.env.NODE_ENV)

// Test path
console.log('✓ Path normalize:', path.normalize('./test/../test.js'))

// Test crypto
const hash = crypto.createHash('md5')
console.log('✓ Crypto hash created')

console.log('All polyfills working correctly!')
