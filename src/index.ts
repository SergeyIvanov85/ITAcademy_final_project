import { Zuma } from "./App/Models/Zuma";

window.onload = () => {
  const scoreDOM = document.body.querySelector('#score') as HTMLElement;
  const startPopup = document.body.querySelector('#start-popup') as HTMLElement;
  const stopPopup = document.body.querySelector('#stop-popup') as HTMLElement;
  const finalPopup = document.body.querySelector('#final-popup') as HTMLElement;
  const finalNum = document.body.querySelector('#final-score') as HTMLElement;

  const zumaGame = new Zuma({
    width: 1200,
    height: 800,
    scale: 0.7,
    path: `M197.519,19.289C158.282,84.171,101.52,201.053,92.5,345.418c-6.6,105.632,47,236.043,159,295.679
		s338.566,101.881,547,64.404c199-35.781,312.016-164.676,313-266c1-103-34-221.816-200-278.044
		c-142.542-48.282-346.846-37.455-471,31.044c-116,64-154.263,213.533-81,304.619c92,114.381,410,116.381,476,2.891
		c62.975-108.289-40-203.51-158-206.51`,
    playerPos: { x: 550, y: 400 },
    updateScore: (score: number) => {
      scoreDOM.innerHTML = `${score}`;
    },
    updateFinal: (isFinal: boolean) => {
      if (isFinal) {
        finalPopup.classList.add('active');
        finalNum.innerHTML = `${zumaGame.score}`;
      }
    }
  });
  zumaGame.appendTo(document.body);

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && zumaGame.isInit) {
      zumaGame.stop();
      stopPopup.classList.add('active');
    }
  });
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (!zumaGame && e.code !== 'Space') {
      return
    }
    e.preventDefault();
    zumaGame.switchMarble();
  });
  window.addEventListener("mousemove", (e: MouseEvent) => {
    if (!zumaGame) {
      return;
    }
    zumaGame.lookAt(e.pageX, e.pageY);
  });
  window.addEventListener("click", (e: MouseEvent) => {
    zumaGame.attack();
  });


  // @ts-ignore
  startPopup.querySelector('#init-btn').addEventListener('click', () => {
    startPopup.classList.remove('active');
    zumaGame.start();
  });
  // @ts-ignore
  stopPopup.querySelector('#start-btn').addEventListener('click', () => {
    stopPopup.classList.remove('active');
    setTimeout(() => {
      zumaGame.start();
    }, 100);
  });
  // @ts-ignore
  stopPopup.querySelector('#reset-btn').addEventListener('click', () => {
    stopPopup.classList.remove('active');
    zumaGame.reset().start();
  });
  // @ts-ignore
  finalPopup.querySelector('#restart-btn').addEventListener('click', () => {
    finalPopup.classList.remove('active');
    zumaGame.reset().start();
  });

  const resize = () => {
    zumaGame.setScale(Math.min(
      window.innerHeight / zumaGame.height,
      window.innerWidth / zumaGame.width,
      1
    ));
  };
  window.addEventListener('resize', resize);
  resize();

  // window.addEventListener('blur', function (e) {
  //     if (zumaGame.isInit && !zumaGame.isFinal) {
  //         zumaGame.stop();
  //         stopPopup.classList.add('active');
  //     }
  // });
};