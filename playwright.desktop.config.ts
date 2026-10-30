import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests/desktop',testMatch:'runtime.spec.ts',timeout:30000,globalTimeout:240000,expect:{timeout:5000},workers:1,retries:0,outputDir:'artifacts/desktop-results',reporter:'list'});
