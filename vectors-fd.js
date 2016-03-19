/**
 *
 *  V is for Vector
 *
 *    ToC
 *      
 *      UI
 *        universal ui
 *        mobile ui
 *        desktop ui
 *
 *      Calculators
 *        vector addition
 *        vector subtraction
 *        scalar multiplication
 *        magnitude
 *        dot product
 *        cross product
 *        angle between two vectors
 *      
 *      Calls
 *
 */


var VECTORS = VECTORS || {};

/**
 *
 * universal ui
 *
 */

VECTORS.universalCalcs = {
  defWinOpenBtnConfig: [
    $('#vec-add-def-btn'),
    $('#vec-sub-def-btn'),  
    $('#vec-scal-mult-def-btn'),
    $('#vec-mag-def-btn'),
    $('#vec-dot-def-btn'),
    $('#vec-cross-def-btn'),
    $('#vec-angle-def-btn')
  ],
  defWinConfig: [
    $('#vec-add-def-win'),
    $('#vec-sub-def-win'),
    $('#vec-scal-mult-def-win'),
    $('#vec-mag-def-win'),
    $('#vec-dot-def-win'),
    $('#vec-cross-def-win'),
    $('#vec-angle-def-win')
  ],
  defWinCloseBtnConfig: [
    $('#vec-add-def-win-close'), 
    $('#vec-sub-def-win-close'),
    $('#vec-scal-mult-def-win-close'),
    $('#vec-mag-def-win-close'),
    $('#vec-dot-def-win-close'),
    $('#vec-cross-def-win-close'),
    $('#vec-angle-def-win-close')
  ],
  slideTime: 500,
  expander: function($defWin) {
    $defWin.slideDown(this.slideTime);
  },
  collapser: function($defWin) {
    $defWin.slideUp(this.slideTime);
  },
  supply: function() {
    return this.defWinConfig.length;
  },
  defWinWelder: function($button, $defWin) {
    return {
      part: $button.click(function() { VECTORS.universalCalcs.expander($defWin); })
    };
  },
  defWinScrapper: function($closeButton, $defWin) {
    return {
      scrap: $closeButton.click(function() { VECTORS.universalCalcs.collapser($defWin); })
    };
  },
  defWinAssemblyLine: function() {
    var defWinOpenBtns = this.defWinOpenBtnConfig,
        defWindows = this.defWinConfig,
        defWinCloseBtns = this.defWinCloseBtnConfig;
    var defWinParts = [];
    for(var i = 0; i < this.supply(); i++) {
      var $button = defWinOpenBtns[i],
          $defWin = defWindows[i],
          $closeButton = defWinCloseBtns[i];
      defWinParts.push(
        VECTORS.universalCalcs.defWinWelder($button, $defWin) +
        VECTORS.universalCalcs.defWinScrapper($closeButton, $defWin) );
    }
    return defWinParts;
  },
  universalWorkOrder: function() {
    this.defWinAssemblyLine();
  }
}

/**
 *
 *  mobile ui
 *
 */

VECTORS.mobileCalcs = {
  calcMenuConfig: {
    $mobCalcMenu: $('#mob-calc-menu'),
    $openMobCalcMenuBtn: $('#mob-calc-menu-open-btn'),
    $closeMobCalcMenuBtn: $('#mob-calc-menu-close'),
    $allCalcOpenBtns: $('.m-mob-calc-menu-btn')
  },
  slideTime: 500,
  displayMobCalcMenu: function() {
    this.calcMenuConfig.$openMobCalcMenuBtn.click(function() { 
      VECTORS.mobileCalcs.calcMenuConfig.$mobCalcMenu.slideDown(VECTORS.mobileCalcs.slideTime);
    });
  },
  closeMobCalcMenu: function() {
    var $mobCalcMenu = this.calcMenuConfig.$mobCalcMenu,
        $closeMobCalcMenuBtn = this.calcMenuConfig.$closeMobCalcMenuBtn,
        $allCalcOpenBtns = this.calcMenuConfig.$allCalcOpenBtns;
    var closeCalcMenu = function($btn) {
      $btn.click(function() { $mobCalcMenu.slideUp(VECTORS.slideTime); });
    };
    closeCalcMenu($closeMobCalcMenuBtn);
    closeCalcMenu($allCalcOpenBtns);
  },
  runMobileCalcs: function() {
    this.displayMobCalcMenu();
    this.closeMobCalcMenu();
  }
};

/**
 *
 * desktop ui
 *
 */

VECTORS.desktopCalcs = {
  menuConfig: {
    menu: $("#dsktp-calc-menu"),
    openMenuButton: $("#dsktp-calc-menu-btn"),
    closeMenuButton: $("#dsktp-calc-menu-up"),
    slideTime: 500
  },
  instructWindowConfig: {
    workspaceInstructWindow: $("#workspace-instruct-win")
  },
  buttonConfig: [
    $('#dsktp-vec-add-btn'),
    $('#dsktp-vec-sub-btn'),
    $('#dsktp-scal-mult-btn'),
    $('#dsktp-mag-btn'),
    $('#dsktp-dot-btn'),
    $('#dsktp-cross-btn'),
    $('#dsktp-angle-btn')
  ],
  windowConfig: [
    $('#vec-add-win'),
    $('#vec-sub-win'),
    $('#vec-scal-mult-win'),
    $('#vec-mag-win'),
    $('#vec-dot-win'),
    $('#vec-cross-win'),
    $('#vec-angle-win')
  ],
  closeButtonConfig: [
    $('#vec-add-win-close'),
    $('#vec-sub-win-close'),
    $('#vec-scal-mult-win-close'),
    $('#vec-mag-win-close'),
    $('#vec-dot-win-close'),
    $('#vec-cross-win-close'),
    $('#vec-angle-win-close')
  ],
  $allCalcWindows: $("[class*='m-def-calc-win-col-']"),
  calcMenuDisplay: function() {
    var $menu = this.menuConfig.menu,
        $instructWin = this.instructWindowConfig.workspaceInstructWindow,
        $openMenuButton = this.menuConfig.openMenuButton,
        $closeMenuButton = this.menuConfig.closeMenuButton,
        $slideTime = this.menuConfig.slideTime;
    return {
      displayMenu: $openMenuButton.click(function() {
        $menu.slideDown($slideTime);
        $instructWin.hide();
      }),
      closeMenu: $closeMenuButton.click(function() { $menu.slideUp($slideTime); })
    };
  },
  addCalcToWorkspace: function($calcWin) {
    $calcWin.show().appendTo('#workspace').css({ 'top': '2.9em', 'left': '18em' });
  },
  removeCalcFromWorkspace: function($calcWin) {
    $calcWin.hide();
  },
  supply: function() {
    return this.buttonConfig.length;
  },
  welder: function($button, $calcWin) {
    return {
      part: $button.click(function() { VECTORS.desktopCalcs.addCalcToWorkspace($calcWin); }),
      draggable: $calcWin.draggable({
        handle: "header",
        containment: $('#workspace'),
        stack: this.$allCalcWindows
      })
    };
  },
  scrapper: function($closeButton, $calcWin) {
    return {
      scrap: $closeButton.click(function() { VECTORS.desktopCalcs.removeCalcFromWorkspace($calcWin); })
    };
  },
  assemblyLine: function() {
    var buttons = this.buttonConfig,
        windows = this.windowConfig,
        closeButtons = this.closeButtonConfig;
    var packedParts = [];
    for(var i = 0; i < this.supply(); i++) {
      var $button = buttons[i],
          $calcWin = windows[i],
          $closeButton = closeButtons[i];
      packedParts.push(
        VECTORS.desktopCalcs.welder($button, $calcWin) +
        VECTORS.desktopCalcs.scrapper($closeButton, $calcWin));
    }
    return packedParts;
  },
  workOrder: function() {
    this.assemblyLine();
    this.calcMenuDisplay();
  }
};

/**
 * Calculators
 */


/**
 * vector calc constructor
 */

function VectorCalculator(config, calculator) {
  this._config = config;
  this._calculator = calculator;
}

VectorCalculator.prototype.run = function() {
  function resetIO () {
    this._config.io.form.reset();
  }
  var calcBtn = this._config.btn.calcBtn,
      rstBtn = this._config.btn.rstBtn,
      calculate = this._calculator.bind(this),
      reset = resetIO.bind(this);
  return {
    calculate: calcBtn.onclick = calculate,
    resetForm: rstBtn.onclick = reset 
  };
};

var calculators = (function() {
  function checkForFraction(value) {
    var check = value.search(/\//);
    if (check > 0) {
      var splitVal = value.split('/');
      var numerator = Number(splitVal[0]);
      var denominator = Number(splitVal[1]);
      return numerator / denominator;
    }
    return Number(value);
  }
  function convertInputArray(inArray) {
    var convertedArr = [];
    var inArrayLength = inArray.length;
    for (var i = 0; i < inArrayLength; i++) {
      var convertedVal = checkForFraction(inArray[i]);  
      convertedArr.push(convertedVal);
    }
    return convertedArr;
  }

  return {
    twoSpaceVecAddCalculator() {
      var io = this._config.io;
      var a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value,
          b1 = io.bOneIn.value,
          b2 = io.bTwoIn.value;
      var vals = convertInputArray([a1, a2, b1, b2]);
      io.solOneOut.value = vals[0] + vals[2];
      io.solTwoOut.value = vals[1] + vals[3];
    },
    threeSpaceVecAddCalculator() {
      var io = this._config.io;
      var a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value,
          a3 = io.aThreeIn.value,
          b1 = io.bOneIn.value,
          b2 = io.bTwoIn.value,
          b3 = io.bThreeIn.value;
      var vals = convertInputArray([a1, a2, a3, b1, b2, b3]);
      io.solOneOut.value = vals[0] + vals[3];
      io.solTwoOut.value = vals[1] + vals[4];
      io.solThreeOut.value = vals[2] + vals[5];
    },
    twoSpaceVecSubCalculator(inArray) {
      var io = this._config.io;
      var a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value,
          b1 = io.bOneIn.value,
          b2 = io.bTwoIn.value;
      var vals = convertInputArray([a1, a2, b1, b2]);
      io.solOneOut.value = vals[0] - vals[2];
      io.solTwoOut.value = vals[1] - vals[3];
    },
    threeSpaceVecSubCalculator(inArray) {
      var io = this._config.io;
      var a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value,
          a3 = io.aThreeIn.value,
          b1 = io.bOneIn.value,
          b2 = io.bTwoIn.value,
          b3 = io.bThreeIn.value;
      var vals = convertInputArray([a1, a2, a3, b1, b2, b3]);
      io.solOneOut.value = vals[0] - vals[3];
      io.solTwoOut.value = vals[1] - vals[4];
      io.solThreeOut.value = vals[2] - vals[5];
    },
    twoSpaceScalarMultCalculator() {
      var io = this._config.io;
      var c = io.scalar.value,
          a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value;
      var vals = convertInputArray([c, a1, a2]);
      io.solOneOut.value = vals[0] * vals[1];
      io.solTwoOut.value = vals[0] * vals[2];
    },
    threeSpaceScalarMultCalculator() {
      var io = this._config.io;
      var c = io.scalar.value,
          a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value,
          a3 = io.aThreeIn.value;
      var vals = convertInputArray([c, a1, a2, a3]);
      io.solOneOut.value = vals[0] * vals[1];
      io.solTwoOut.value = vals[0] * vals[2];
      io.solThreeOut.value = vals[0] * vals[3];
    },
    twoSpaceMagCalculator() {
      var io = this._config.io;
      var a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value;
      var vals = convertInputArray([a1, a2]);
      io.solution.value = Math.sqrt(Math.pow(vals[0], 2) + Math.pow(vals[1], 2));
    },
    threeSpaceMagCalculator() {
      var io = this._config.io;
      var a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value,
          a3 = io.aThreeIn.value;
      var vals = convertInputArray([a1, a2, a3]);
      io.solution.value = Math.sqrt(Math.pow(vals[0], 2) + Math.pow(vals[1], 2) + Math.pow(vals[2], 2));
    },
    twoSpaceDotCalculator() {
      var io = this._config.io;
      var a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value,
          b1 = io.bOneIn.value,
          b2 = io.bTwoIn.value;
      var vals = convertInputArray([a1, a2, b1, b2]);
      io.solution.value = (vals[0] * vals[2]) + (vals[1] * vals[3]);
    },
    threeSpaceDotCalculator() {
      var io = this._config.io;
      var a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value,
          a3 = io.aThreeIn.value,
          b1 = io.bOneIn.value,
          b2 = io.bTwoIn.value,
          b3 = io.bThreeIn.value;
      var vals = convertInputArray([a1, a2, a3, b1, b2, b3]);
      io.solution.value = (vals[0] * vals[3]) + (vals[1] * vals[4]) + (vals[2] * vals[5]);
    },
    crossProductCalculator() {
      var io = this._config.io;
      var a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value,
          a3 = io.aThreeIn.value,
          b1 = io.bOneIn.value,
          b2 = io.bTwoIn.value,
          b3 = io.bThreeIn.value;
      var vals = convertInputArray([a1, a2, a3, b1, b2, b3]);
      io.solOneOut.value = (vals[1] * vals[5]) - (vals[2] * vals[4]);
      io.solTwoOut.value = (vals[2] * vals[3]) - (vals[0] * vals[5]);
      io.solThreeOut.value = (vals[0] * vals[4]) - (vals[1] * vals[3]);
    },
    twoSpaceAngleCalculator() {
      var io = this._config.io;
      var a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value,
          b1 = io.bOneIn.value,
          b2 = io.bTwoIn.value;
      var vals = convertInputArray([a1, a2, b1, b2]);
      var dot = (vals[0] * vals[2]) + (vals[1] * vals[3]),
          magA = Math.sqrt(Math.pow(vals[0], 2) + Math.pow(vals[1], 2)),
          magB = Math.sqrt(Math.pow(vals[2], 2) + Math.pow(vals[3], 2));
      io.theta.value = Math.acos(dot/(magA * magB));
    },
    threeSpaceAngleCalculator() {
      var io = this._config.io;
      var a1 = io.aOneIn.value,
          a2 = io.aTwoIn.value,
          a3 = io.aThreeIn.value,
          b1 = io.bOneIn.value,
          b2 = io.bTwoIn.value,
          b3 = io.bThreeIn.value;
      var vals = convertInputArray([a1, a2, a3, b1, b2, b3]);
      var dot = (vals[0] * vals[3]) + (vals[1] * vals[4]) + (vals[2] * vals[5]),
          magA = Math.sqrt(Math.pow(vals[0], 2) + Math.pow(vals[1], 2) + Math.pow(vals[2], 2)),
          magB = Math.sqrt(Math.pow(vals[3], 2) + Math.pow(vals[4], 2) + Math.pow(vals[5], 2));
      io.theta.value = Math.acos(dot/(magA * magB));
    }
  }
})();

/**
 *
 * vector addition
 *
 */

(function(VECTORS) {
  var twoSpaceVecAddConfig = { 
    io: {
      form: document.getElementById("twoD-vAdd-calc"),
      aOneIn: document.getElementById("twoD-vAdd-aOne-in"),
      aTwoIn: document.getElementById("twoD-vAdd-aTwo-in"), 
      bOneIn: document.getElementById("twoD-vAdd-bOne-in"),
      bTwoIn: document.getElementById("twoD-vAdd-bTwo-in"),
      solOneOut: document.getElementById("twoD-vAdd-solOne-out"),
      solTwoOut: document.getElementById("twoD-vAdd-solTwo-out")
    },
    btn: {
      calcBtn: document.getElementById("twoD-vAdd-calc-btn"),
      rstBtn: document.getElementById("twoD-vAdd-rst-btn")
    }
  };

  var twoSpaceVecAddCalculator = calculators.twoSpaceVecAddCalculator;

  VECTORS.twoSpaceVecAddCalc = new VectorCalculator(twoSpaceVecAddConfig, twoSpaceVecAddCalculator);
})(VECTORS);

(function(VECTORS) {
  var threeSpaceVecAddConfig = {
    io: {
      form: document.getElementById("threeD-vAdd-calc"),
      aOneIn: document.getElementById("threeD-vAdd-aOne-in"),
      aTwoIn: document.getElementById("threeD-vAdd-aTwo-in"), 
      aThreeIn: document.getElementById("threeD-vAdd-aThree-in"),
      bOneIn: document.getElementById("threeD-vAdd-bOne-in"),
      bTwoIn: document.getElementById("threeD-vAdd-bTwo-in"),
      bThreeIn: document.getElementById("threeD-vAdd-bThree-in"),
      solOneOut: document.getElementById("threeD-vAdd-solOne-out"),
      solTwoOut: document.getElementById("threeD-vAdd-solTwo-out"),
      solThreeOut: document.getElementById("threeD-vAdd-solThree-out")
    },
    btn: {
      calcBtn: document.getElementById("threeD-vAdd-calc-btn"),
      rstBtn: document.getElementById("threeD-vAdd-rst-btn")
    }
  };

  var threeSpaceVecAddCalculator = calculators.threeSpaceVecAddCalculator;

  VECTORS.threeSpaceVecAddCalc = new VectorCalculator(threeSpaceVecAddConfig, threeSpaceVecAddCalculator);
})(VECTORS);


/**
 *
 * vector subtraction
 *
 */

(function(VECTORS) {
  var twoSpaceVecSubConfig = {
    io: {
      form: document.getElementById("twoD-vSub-calc"),
      aOneIn: document.getElementById("twoD-vSub-aOne-in"),
      aTwoIn: document.getElementById("twoD-vSub-aTwo-in"), 
      bOneIn: document.getElementById("twoD-vSub-bOne-in"),
      bTwoIn: document.getElementById("twoD-vSub-bTwo-in"),
      solOneOut: document.getElementById("twoD-vSub-solOne-out"),
      solTwoOut: document.getElementById("twoD-vSub-solTwo-out")
    },
    btn: {
      calcBtn: document.getElementById("twoD-vSub-calc-btn"),
      rstBtn: document.getElementById("twoD-vSub-rst-btn")
    }
  };

  var twoSpaceVecSubCalculator  = calculators.twoSpaceVecSubCalculator;

  VECTORS.twoSpaceVecSubCalc = new VectorCalculator(twoSpaceVecSubConfig, twoSpaceVecSubCalculator);
})(VECTORS);

(function(VECTORS) {
  var threeSpaceVecSubCalcConfig = {
    io: {
      form: document.getElementById("threeD-vSub-calc"),
      aOneIn: document.getElementById("threeD-vSub-aOne-in"),
      aTwoIn: document.getElementById("threeD-vSub-aTwo-in"), 
      aThreeIn: document.getElementById("threeD-vSub-aThree-in"),
      bOneIn: document.getElementById("threeD-vSub-bOne-in"),
      bTwoIn: document.getElementById("threeD-vSub-bTwo-in"),
      bThreeIn: document.getElementById("threeD-vSub-bThree-in"),
      solOneOut: document.getElementById("threeD-vSub-solOne-out"),
      solTwoOut: document.getElementById("threeD-vSub-solTwo-out"),
      solThreeOut: document.getElementById("threeD-vSub-solThree-out")
    },
    btn: {
      calcBtn: document.getElementById("threeD-vSub-calc-btn"),
      rstBtn: document.getElementById("threeD-vSub-rst-btn")
    }
  };

  var threeSpaceVecSubCalculator = calculators.threeSpaceVecSubCalculator;

  VECTORS.threeSpaceVecSubCalc = new VectorCalculator(
    threeSpaceVecSubCalcConfig, threeSpaceVecSubCalculator
  );
})(VECTORS);

/**
 *
 * scalar multiplication
 *
 */

(function(VECTORS) {
  var twoSpcScalMultConfig = {
    io: {
      form: document.getElementById("twoD-scal-mult-calc"),
      scalar: document.getElementById("twoD-vScal-mult-c-in"),
      aOneIn: document.getElementById("twoD-vScal-mult-aOne-in"),
      aTwoIn: document.getElementById("twoD-vScal-mult-aTwo-in"), 
      solOneOut: document.getElementById("twoD-vScal-mult-solOne-out"),
      solTwoOut: document.getElementById("twoD-vScal-mult-solTwo-out")
    },
    btn: {
      calcBtn: document.getElementById("twoD-vScal-mult-calc-btn"),
      rstBtn: document.getElementById("twoD-vScal-mult-rst-btn")
    }
  };

  var twoSpaceScalMultCalculator = calculators.twoSpaceScalarMultCalculator;

  VECTORS.twoSpaceScalMultCalc = new VectorCalculator(
    twoSpcScalMultConfig, twoSpaceScalMultCalculator
  );
})(VECTORS);

(function(VECTORS) {
  var threeSpaceScalMultConfig = {
    io: {
      form: document.getElementById("threeD-scal-mult-calc"),
      scalar: document.getElementById("threeD-vScal-mult-c-in"),
      aOneIn: document.getElementById("threeD-vScal-mult-aOne-in"),
      aTwoIn: document.getElementById("threeD-vScal-mult-aTwo-in"), 
      aThreeIn: document.getElementById("threeD-vScal-mult-aThree-in"),
      solOneOut: document.getElementById("threeD-vScal-mult-solOne-out"),
      solTwoOut: document.getElementById("threeD-vScal-mult-solTwo-out"),
      solThreeOut: document.getElementById("threeD-vScal-mult-solThree-out")
    },
    btn: {
      calcBtn: document.getElementById("threeD-vScal-mult-calc-btn"),
      rstBtn: document.getElementById("threeD-vScal-mult-rst-btn")
    }
  };

  var threeSpaceScalarMultCalculator = calculators.threeSpaceScalarMultCalculator;

  VECTORS.threeSpaceScalMultCalc = new VectorCalculator(
    threeSpaceScalMultConfig, threeSpaceScalarMultCalculator
  );
})(VECTORS);

/**
 *
 * vector subtraction
 *
 */

(function(VECTORS) {
  var twoSpaceMagConfig = {
    io: {
      form: document.getElementById("twoD-mag-calc"),
      aOneIn: document.getElementById("twoD-mag-aOne-in"),
      aTwoIn: document.getElementById("twoD-mag-aTwo-in"), 
      solution: document.getElementById("twoD-mag-sol-out"),
    },
    btn: {
      calcBtn: document.getElementById("twoD-mag-calc-btn"),
      rstBtn: document.getElementById("twoD-mag-rst-btn")
    }
  };

  var twoSpaceMagCalculator = calculators.twoSpaceMagCalculator;

  VECTORS.twoSpaceMagCalc = new VectorCalculator(
    twoSpaceMagConfig, twoSpaceMagCalculator
  );
})(VECTORS);

(function(VECTORS) {
  var threeSpaceMagConfig = {
    io: {
      form: document.getElementById("threeD-mag-calc"),
      aOneIn: document.getElementById("threeD-mag-aOne-in"),
      aTwoIn: document.getElementById("threeD-mag-aTwo-in"), 
      aThreeIn: document.getElementById("threeD-mag-aThree-in"),
      solution: document.getElementById("threeD-mag-sol-out"),
    },
    btn: {
      calcBtn: document.getElementById("threeD-mag-calc-btn"),
      rstBtn: document.getElementById("threeD-mag-rst-btn")
    }
  };

  var threeSpaceMagCalculator = calculators.threeSpaceMagCalculator;

  VECTORS.threeSpaceMagCalc = new VectorCalculator(
    threeSpaceMagConfig, threeSpaceMagCalculator
  );
})(VECTORS);


/**
 *
 * dot product 
 *
 */

(function(VECTORS) {
  var twoSpaceDotConfig = {
    io: {
      form: document.getElementById("twoD-dot-calc"),
      aOneIn: document.getElementById("twoD-dot-aOne-in"),
      aTwoIn: document.getElementById("twoD-dot-aTwo-in"), 
      bOneIn: document.getElementById("twoD-dot-bOne-in"),
      bTwoIn: document.getElementById("twoD-dot-bTwo-in"),
      solution: document.getElementById("twoD-dot-out")
    },
    btn: {
      calcBtn: document.getElementById("twoD-dot-calc-btn"),
      rstBtn: document.getElementById("twoD-dot-rst-btn")
    }
  };

  var twoSpaceDotCalculator =  calculators.twoSpaceDotCalculator;

  VECTORS.twoSpaceDotCalc = new VectorCalculator(
    twoSpaceDotConfig, twoSpaceDotCalculator
  );
})(VECTORS);

(function(VECTORS) {
  var threeSpaceDotConfig = {
    io: {
      form: document.getElementById("threeD-dot-calc"),
      aOneIn: document.getElementById("threeD-dot-aOne-in"),
      aTwoIn: document.getElementById("threeD-dot-aTwo-in"), 
      aThreeIn: document.getElementById("threeD-dot-aThree-in"),
      bOneIn: document.getElementById("threeD-dot-bOne-in"),
      bTwoIn: document.getElementById("threeD-dot-bTwo-in"),
      bThreeIn: document.getElementById("threeD-dot-bThree-in"),
      solution: document.getElementById("threeD-dot-out")
    },
    btn: {
      calcBtn: document.getElementById("threeD-dot-calc-btn"),
      rstBtn: document.getElementById("threeD-dot-rst-btn")
    }
  };

  var threeSpaceDotCalculator = calculators.threeSpaceDotCalculator;

  VECTORS.threeSpaceDotCalc = new VectorCalculator(
    threeSpaceDotConfig, threeSpaceDotCalculator
  );
})(VECTORS);

/**
 *
 * cross product 
 *
 */

(function(VECTORS) {
  var crossProductConfig = {
    io: {
      form: document.getElementById("threeD-cross-calc"),
      aOneIn: document.getElementById("cross-aOne-in"),
      aTwoIn: document.getElementById("cross-aTwo-in"), 
      aThreeIn: document.getElementById("cross-aThree-in"),
      bOneIn: document.getElementById("cross-bOne-in"),
      bTwoIn: document.getElementById("cross-bTwo-in"),
      bThreeIn: document.getElementById("cross-bThree-in"),
      solOneOut: document.getElementById("cross-solOne-out"),
      solTwoOut: document.getElementById("cross-solTwo-out"),
      solThreeOut: document.getElementById("cross-solThree-out")
    },
    btn: {
      calcBtn: document.getElementById("cross-calc-btn"),
      rstBtn: document.getElementById("cross-rst-btn")
    }
  };

  var crossProductCalculator = calculators.crossProductCalculator;

  VECTORS.crossProductCalc = new VectorCalculator(
    crossProductConfig, crossProductCalculator
  );
})(VECTORS);


/**
 *
 * angle between two vectors 
 *
 */

(function(VECTORS) {
  var twoSpaceAngleConfig = {
    io: {
      form: document.getElementById("twoD-angle-calc"),
      aOneIn: document.getElementById("twoD-angle-aOne-in"),
      aTwoIn: document.getElementById("twoD-angle-aTwo-in"), 
      bOneIn: document.getElementById("twoD-angle-bOne-in"),
      bTwoIn: document.getElementById("twoD-angle-bTwo-in"),
      theta: document.getElementById("twoD-angle-sol-out")
    },
    btn: {
      calcBtn: document.getElementById("twoD-angle-calc-btn"),
      rstBtn: document.getElementById("twoD-angle-rst-btn")
    }
  };

  var twoSpaceAngleCalculator = calculators.twoSpaceAngleCalculator;

  VECTORS.twoSpaceAngleCalc = new VectorCalculator(
    twoSpaceAngleConfig, twoSpaceAngleCalculator
  );
})(VECTORS);

(function(VECTORS) {
  var threeSpaceAngleConfig = {
    io: {
      form: document.getElementById("threeD-angle-calc"),
      aOneIn: document.getElementById("threeD-angle-aOne-in"),
      aTwoIn: document.getElementById("threeD-angle-aTwo-in"), 
      aThreeIn: document.getElementById("threeD-angle-aThree-in"),
      bOneIn: document.getElementById("threeD-angle-bOne-in"),
      bTwoIn: document.getElementById("threeD-angle-bTwo-in"),
      bThreeIn: document.getElementById("threeD-angle-bThree-in"),
      theta: document.getElementById("threeD-angle-sol-out")
    },
    btn: {
      calcBtn: document.getElementById("threeD-angle-calc-btn"),
      rstBtn: document.getElementById("threeD-angle-rst-btn")
    }
  };

  var threeSpaceAngleCalculator = calculators.threeSpaceAngleCalculator;

  VECTORS.threeSpaceAngleCalc = new VectorCalculator(
    threeSpaceAngleConfig, threeSpaceAngleCalculator
  );
})(VECTORS);

/**
 *
 * Calls
 *
 */

VECTORS.universalCalcs.universalWorkOrder();

VECTORS.mobileCalcs.runMobileCalcs();

if(window.innerWidth >= 768) {
  VECTORS.desktopCalcs.workOrder();
}

VECTORS.twoSpaceVecAddCalc.run();
VECTORS.threeSpaceVecAddCalc.run();
VECTORS.twoSpaceVecSubCalc.run();
VECTORS.threeSpaceVecSubCalc.run();
VECTORS.twoSpaceScalMultCalc.run();
VECTORS.threeSpaceScalMultCalc.run();
VECTORS.twoSpaceMagCalc.run();
VECTORS.threeSpaceMagCalc.run();
VECTORS.twoSpaceDotCalc.run();
VECTORS.threeSpaceDotCalc.run();
VECTORS.crossProductCalc.run();
VECTORS.twoSpaceAngleCalc.run();
VECTORS.threeSpaceAngleCalc.run();
