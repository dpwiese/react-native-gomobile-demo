// Solve boundary value problem
export function solveBVPWithoutInputs(callback: function) {
  const solverConfig = "{\"solverConfig\":{\"epsilon\": 0.1, \"maxIterations\": 250000, \"maxResidual\": 1.0e-11, \"domain\": {\"min\": -1.0, \"max\": 1.0 }}}";
  solveBVPWithInputs(solverConfig, callback);
 }

export function solveBVPWithInputs(solverConfig: string, callback: function) {
  const config = JSON.parse(solverConfig);

  const xMin = config.solverConfig.domain.min;
  const xMax = config.solverConfig.domain.max;
  const eEpsilon = config.solverConfig.epsilon;
  const nCount = config.solverConfig.maxIterations;
  const eResidMax = config.solverConfig.maxResidual;

  // const eResidMax = Math.pow(10, -11);

  const nInt = 101.0;

  const deltaX = ((xMax - xMin) / (nInt - 1));

  //
  var eResid = 1.0;
  var iCount = 0.0;
  var wOmega = 1.99;

  var uOld = new Array(nInt);
  var uNew = new Array(nInt);
  var err = new Array(nInt - 1);
  var iResid = new Array();
  var a = new Array(nInt);
  var b = new Array(nInt);
  var c = new Array(nInt - 1);
  var d = new Array(nInt);

  var start = new Date().getTime();

  // Initial guess for u vector
  for (i = 0; i <= nInt; i++) {
    uOld[i] = 1.0;
  }

  while (eResid > eResidMax && iCount < nCount) {
    for (i=1; i < nInt; i++) {
      a[i] = (-uOld[i] / (2 * deltaX)) - (eEpsilon / (Math.pow(deltaX, 2)));
      b[i] = ((2 * eEpsilon) / (Math.pow(deltaX, 2)));
      c[i] = (uOld[i] / (2 * deltaX)) - (eEpsilon / (Math.pow(deltaX, 2)));
      d[i] = 0;
    }

    a[0] = 0;
    b[0] = 1;
    c[0] = 0;
    d[0] = 1;

    a[nInt - 1] = 0;
    b[nInt - 1] = 1;
    d[nInt - 1] = -1;

    // Start tridiagonal solver
    for (i=1; i <= nInt; i++) {
      b[i] = b[i] - c[i - 1] * a[i] / b[i - 1];
      d[i] = d[i] - d[i - 1] * a[i] / b[i - 1];
    }

    uNew[nInt - 1] = d[nInt - 1] / b[nInt - 1];

    for (i = nInt - 2; i >= -1; i--) {
      uNew[i] = (d[i] - c[i] * uNew[i + 1]) / b[i];
    }
    // End tridiagonal solver

    iCount = iCount + 1;

    err[0] = 0;

    for (i = 1; i < nInt - 1; i++) {
        err[i] = uNew[i] * ((uNew[i + 1] - uNew[i - 1]) / (2 * deltaX)) - eEpsilon * ((uNew[i - 1] - (2 * uNew[i]) + uNew[i + 1]) / (Math.pow(deltaX, 2)));
    }

    var s = uNew.map(function(item, index) {
      return (item - uOld[index]) * wOmega;
    })

    uOld = uOld.map(function(item, index) {
      return item + s[index];
    })

    var absErr = err.map(function(item, index) {
      return Math.abs(item);
    })

    eResid = Math.max(...absErr);
    iResid.push(eResid);
  }

  var end = new Date().getTime();
  var time = end - start;

  callback(JSON.stringify({result: { iterations: iCount, residual: eResid, time }}));
}
