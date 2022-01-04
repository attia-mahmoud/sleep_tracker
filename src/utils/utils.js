const calcDif = data => {
  if (!data.sleepTime | !data.wakeTime) {
    return;
  }
  const timeStart = new Date('01/01/2007 ' + data.sleepTime);
  const timeEnd = new Date('01/01/2007 ' + data.wakeTime);
  const hours = parseInt(
    (Math.abs(timeEnd - timeStart) / (1000 * 60 * 60)) % 24
  );
  const minutes = parseInt(
    (Math.abs(timeEnd.getTime() - timeStart.getTime()) / (1000 * 60)) % 60
  );

  return { hours, minutes };
};

export { calcDif };
