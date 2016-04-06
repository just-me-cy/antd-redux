import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Router, useRouterHistory, browserHistory,RouterContext, match} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
// import routes  from 'routes';
import  routes  from '../routes/routes';
import AppStore from '../store/AppStore';


// import createLocation            from 'history/lib/createLocation';

const app = Express ();

// app.use(handleRender);

function renderFullPage(html,initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>server render</title>
      </head>
      <body>
        <div id="wrap">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `
}

function handleRender(req,res) {

  // const location = createLocation(req.url);
  // 创建新的 Redux store 实例
  const store = AppStore();

  // const history = syncHistoryWithStore(browserHistory, store);

  // const history = useRouterHistory(createHashHistory)({ queryKey: false });

   // <Router routes={ROUTES} history={history}/>
  // 把组件渲染成字符串
  const InitialView = (
    <Provider store={store}>
      <RoutingContext {...renderProps} />
    </Provider>
    );

  // const t = React.createD

  const html = renderToString(InitialView);

  // 从 store 中获得初始 state
  const initialState = store.getState();

   // 把渲染后的页面内容发送给客户端
  res.send(renderFullPage(html, initialState));
}



// app.use(express.static(path.join(__dirname, 'src/datas')));
// 
// app.get('/index',function(req,res){
//   const store = AppStore();

//   // const history = syncHistoryWithStore(browserHistory, store);
//   // 把组件渲染成字符串
//   const InitialView = (
//     <Provider store={store}>
//       <Router routes={ROUTES} history={createBrowserHistory()}/>
//     </Provider>
//     );

//   // const t = React.createD

//   const html = renderToString(InitialView);

//   // 从 store 中获得初始 state
//   const initialState = store.getState();

//    // 把渲染后的页面内容发送给客户端
//   res.send(renderFullPage(html, initialState));
// });

// app.get('/datas/:filename', function (req, res) {
//   var fname = req.params.filename;
//   console.log(fname);
//   res.set({
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin':'*'
//   })
//   res.sendfile('src/datas/'+fname);
// });

app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const store = AppStore();
      const state = store.getState();

        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        res.end(renderFullPage(html, store.getState()));
      
    } else {
      res.status(404).end('Not found1');
    }
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log('Server listening on: ' + PORT);
});

export default app;