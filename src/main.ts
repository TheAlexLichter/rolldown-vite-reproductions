
// @ts-ignore
const NODE_ENV = process.env.NODE_ENV;
console.log('NODE_ENV in main.ts should be development:', NODE_ENV);

// @ts-ignore
const SOME_ENV = process.env.SOME_ENV;
console.log('SOME_ENV in main.ts should be undefined:', SOME_ENV);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    Below should log: development - undefined<br><br>
    <hr>
    ${NODE_ENV} - ${SOME_ENV}
  </div>
`