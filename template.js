var temmplates = {
    "app/app.component.ts":
    `import { Component } from '@angular/core';
 
@Component({
  selector: 'my-app',
  template: '<h1>Welcome to {{value}}</h1>'
})
export class AppComponent { 
  public value: string = "Angular2";
  
  constructor() { } 
}`,
    "app/app.module.ts": `import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }`,
    "app/main.ts": `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);`,
    "index.html": `<html>
<head>
  <script src="node_modules/core-js/client/shim.min.js"></script>
  <script src="node_modules/zone.js/dist/zone.js"></script>
  <script src="node_modules/reflect-metadata/Reflect.js"></script>
  <script src="node_modules/systemjs/dist/system.src.js"></script>
  <script src="systemjs.config.js"></script>
  <script>
    System.import('applicationStartup').catch(function (err) {
      console.error(err);
    });
  </script>
</head>

<body>
  <my-app>Loading...</my-app>
</body>

</html>`,
    "systemjs.config.js": `System.config({
    defaultJSExtensions: true,
    map: {
        app:"applicationStartup",
        '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
        '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 
             'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 
             'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
        'rxjs': 'node_modules/rxjs'
    },
    packages : {
        app : {
                main : '../../build/main.js',
                defaultJSExtensions : 'js'
            },
        rxjs :{
            defaultJSExtensions : "js"
        }
    }
});`
};
module.exports = temmplates;