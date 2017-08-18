var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
 $('.panel').find('.panel-body').slideUp();
 $('.panel').addClass('panel-collapsed');
 $('.panel .panel-heading span').addClass('panel-collapsed');
 $('.panel-heading').find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
}

var ctx = document.getElementById('lineChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4'],
    datasets: [{
      data: [250000, 300000, 240000, 400000],
      backgroundColor: "rgba(255,255,255,0.6)"
    }, {
      data: [270000, 230000, 300000, 290000],
      backgroundColor: "rgba(255,245,246,0.6)"
    }]
  }
});

var ctx2 = document.getElementById('lineChart2').getContext('2d');
var myChart2 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4'],
    datasets: [{
      data: [250000, 300000, 240000, 400000],
      backgroundColor: "rgba(255,255,255,0.6)"
    }, {
      data: [270000, 230000, 300000, 290000],
      backgroundColor: "rgba(255,245,246,0.6)"
    }]
  }
});

// paneles collapsibles

const panels = $('span.clickable')
panels.each(function(){
  const panel = $(this)
  panel.click(handlePanelCollapse)
})

function handlePanelCollapse(e){
    var $this = $(this);
	if(!$this.hasClass('panel-collapsed')) {
    $this.parents('.panel').addClass('panel-collapsed');
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
    $this.parents('.panel').removeClass('panel-collapsed');
		$this.removeClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
	}
}
