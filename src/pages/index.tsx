import { Application, HistoryMode, withImport } from '@codixjs/codix';
import { Client, ClientProvider } from '@codixjs/fetch';
import { BlogProvider } from '@pjblog/hooks';
import { BlogError } from '../components';

export default function(app: Application<HistoryMode>) {
  const client = new Client();

  if (typeof window !== 'undefined' && window.INITIALIZE_STATE) {
    client.initialize(window.INITIALIZE_STATE);
  }

  // SSR 数据容器
  // 注入来自服务端数据
  app.use(ClientProvider, { client });

  // 博客基础数据注入
  app.use(BlogProvider, { 
    fallback: 'loading...',
    close: 'website closed...',
    forbiden: 'current user forbiden ...',
    error: BlogError,
  });

  const HOME = app.bind(
    '/', 
    ...withImport(() => import('./home'), { 
      fallback: 'loading...' 
    })
  );

  return {
    HOME,
    client,
  }
}