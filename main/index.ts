import { definePackage } from '@pjblog/core';

export default definePackage('theme', {
  preview: '',
  schema: {
    a: {
      type: 'number',
      default: 100,
    }
  }
});