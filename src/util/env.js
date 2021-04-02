// import Vconsole from 'vconsole'
const env = import.meta.env;

// if(env.VITE_APP_ENV === 'DEV'){
//   const vConsole = new Vconsole();
//   console.log(vConsole, 'vConsole被调用')
// }

export const baseUrl = env.VITE_PC_BASEURL