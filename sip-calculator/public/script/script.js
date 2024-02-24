function bindInputAndSlider(inputId, sliderId) {
    // Update slider when input changes
    document.getElementById(inputId).addEventListener('input', function () {
        document.getElementById(sliderId).value = this.value;
    });

    // Update input when slider changes
    document.getElementById(sliderId).addEventListener('input', function () {
        document.getElementById(inputId).value = this.value;
    });
}

// Bind input and slider for Monthly Investment
bindInputAndSlider('commonPrincipal', 'commonPrincipalSlider');
bindInputAndSlider('commonDurationYear', 'commonDurationYearSlider');
bindInputAndSlider('commonDurationMonth', 'commonDurationMonthSlider');
bindInputAndSlider('commonRate', 'commonRateSlider');


am4core.ready(function () {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.credits = false;
    chart.hiddenState.properties.opacity = 0;

    chart.innerRadius = am4core.percent(40);
    chart.depth = 80;
    chart.logo.disabled = true;

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.depthValue = "depthValue";
    series.dataFields.category = "category";
    series.dataFields.totalValue = "totalValue";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 1;

    series.labels.template.disabled = true; // Disable default labels       




    document.getElementById('commonDurationYear').addEventListener('change', function () {
        calculateYearWise();
    });

    document.getElementById('commonDurationMonth').addEventListener('change', function () {
        calculateMonthWise();
    });

    function calculateYearWise() {
        // Call the appropriate calculation function based on SIP or Lump Sum
        if (document.getElementById('sip').checked) {
            calculateYearWiseSIP();
        } else {
            calculateYearWiseLumpSum();
        }
    }

    function calculateMonthWise() {
        // Call the appropriate calculation function based on SIP or Lump Sum
        if (document.getElementById('sip').checked) {
            calculateMonthWiseSIP();
        } else {
            calculateMonthWiseLumpSum();
        }
    }



    // Function to calculate month-wise data for SIP
    function calculateMonthWiseSIP() {
        const commonPrincipal = parseFloat(document.getElementById('commonPrincipal').value);
        const commonDurationMonth = parseInt(document.getElementById('commonDurationMonth').value);
        const commonRate = parseFloat(document.getElementById('commonRate').value) / 100;

        const totalDurationInMonths = commonDurationMonth;
        const monthlyInterestRate = commonRate / 12;

        var totalInvestment = 0;
        var monthWiseDataSIP = [];

        for (var month = 1; month <= totalDurationInMonths; month++) {
            var totalValue = 0;
            for (var i = 1; i <= month; i++) {
                totalValue += commonPrincipal * Math.pow(1 + monthlyInterestRate, i);
            }
            const interestValue = totalValue - (commonPrincipal * month);
            totalInvestment += commonPrincipal;

            monthWiseDataSIP.push({
                month: month,
                totalInvestment: totalInvestment.toFixed(0.60),
                interestValue: interestValue.toFixed(0.60),
                totalValue: totalValue.toFixed(0.60)
            });
        }

        updateSummary(monthWiseDataSIP, 'monthWise');
    }

    // Function to calculate year-wise data for SIP
    function calculateYearWiseSIP() {
        const commonPrincipal = parseFloat(document.getElementById('commonPrincipal').value);
        const commonDurationYear = parseInt(document.getElementById('commonDurationYear').value);
        const commonRate = parseFloat(document.getElementById('commonRate').value) / 100;

        const totalDurationInMonths = commonDurationYear * 12;
        const monthlyInterestRate = commonRate / 12;

        var totalInvestment = 0;
        var yearWiseDataSIP = [];

        for (var year = 1; year <= commonDurationYear; year++) {
            var totalValue = 0;
            for (var month = 1; month <= year * 12; month++) {
                totalValue += commonPrincipal * Math.pow(1 + monthlyInterestRate, month);
            }
            const interestValue = totalValue - (commonPrincipal * 12 * year);
            totalInvestment += commonPrincipal * 12;

            yearWiseDataSIP.push({
                year: year,
                totalInvestment: totalInvestment.toFixed(0.60),
                interestValue: interestValue.toFixed(0.60),
                totalValue: totalValue.toFixed(0.60)
            });
        }
        // console.log(yearWiseDataSIP)
        updateSummary(yearWiseDataSIP, 'yearWise');
    }

    // Function to calculate month-wise data for Lump Sum
    function calculateMonthWiseLumpSum() {
        const commonPrincipal = parseFloat(document.getElementById('commonPrincipal').value);
        const commonDurationMonth = parseInt(document.getElementById('commonDurationMonth').value);
        const commonRate = parseFloat(document.getElementById('commonRate').value) / 100;
    
        var monthWiseDataLumpSum = [];
    
        for (var month = 1; month <= commonDurationMonth; month++) {
            const totalDurationInMonths = month;
            const amount = commonPrincipal * Math.pow(1 + commonRate, totalDurationInMonths / 12);
    
            const interestValue = amount - commonPrincipal;
            const totalValue = amount;
            const totalInvestment = commonPrincipal;
    
            monthWiseDataLumpSum.push({
                month: month,
                totalInvestment: totalInvestment.toFixed(0.60),
                interestValue: interestValue.toFixed(0.60),
                totalValue: totalValue.toFixed(0.60)
            });
        }
    
        updateSummary(monthWiseDataLumpSum, 'monthWise');
    }
    

    function calculateYearWiseLumpSum() {
        const commonPrincipal = parseFloat(document.getElementById('commonPrincipal').value);
        const commonDurationYear = parseInt(document.getElementById('commonDurationYear').value);
        const commonRate = parseFloat(document.getElementById('commonRate').value) / 100;
    
        var yearWiseDataLumpSum = [];
    
        for (var year = 1; year <= commonDurationYear; year++) {
            const totalDurationInMonths = year * 12;
            const amount = commonPrincipal * Math.pow(1 + commonRate, year);
    
            const interestValue = amount - commonPrincipal;
            const totalValue = amount;
            const totalInvestment = commonPrincipal;
    
            yearWiseDataLumpSum.push({
                year: year,
                totalInvestment: totalInvestment.toFixed(0.60),
                interestValue: interestValue.toFixed(0.60),
                totalValue: totalValue.toFixed(0.60)
            });
        }
    
        updateSummary(yearWiseDataLumpSum, 'yearWise');
    }
    



    // Shared updateSummary function for both SIP and Lump Sum
    function updateSummary(data, calculationType) {
        const summaryElement = document.querySelector('.summary');

        summaryElement.innerHTML = `
        <h2>Summary</h2>
        <h5>Total Investment: <span id="totalInvestment"></span></h5>
        <h5>Estimated Returns: <span id="interestValue"></span></h5>
        <h5>Future Value: <span id="totalValue"></span></h5>
    `;

        const lastIndex = data.length - 1;
        const lastData = data[lastIndex];

        document.getElementById('totalInvestment').innerText = lastData?.totalInvestment || '';
        document.getElementById('interestValue').innerText = lastData?.interestValue || '';
        document.getElementById('totalValue').innerText = lastData?.totalValue || '';


        updateChart(data, calculationType);
    }

    function updateChart(data, calculationType) {
        // Update chart based on calculation type
        if (calculationType === 'yearWise') {
            chart.data = data.map(item => ({
                category: `Year ${item.year}, ${item.totalInvestment},${item.totalValue}`,
                value: parseFloat(item.interestValue),
                depthValue: parseFloat(item.totalInvestment),
                totalValue: parseFloat(item.totalValue)
            }));
        } else if (calculationType === 'monthWise') {
            chart.data = data.map(item => ({
                category: `Month ${item.month}, ${item.totalInvestment},${item.totalValue}`,
                value: parseFloat(item.interestValue),
                depthValue: parseFloat(item.totalInvestment),
                totalValue: parseFloat(item.totalValue)
            }));
        }
    }
    // Call updateChart function for year-wise calculation
    updateChart('yearWise');

    // Call updateChart function for month-wise calculation
    updateChart('monthWise');


function handleMouseWheel(event) {
    const inputElement = $(this);
    const currentValue = parseInt(inputElement.val());
    const step = parseInt(inputElement.attr('step')) || 1;

    if (!isNaN(currentValue) && !isNaN(step)) {
        if (event.originalEvent.deltaY > 0) {
            inputElement.val(Math.max(currentValue - step, inputElement.attr('min') || 0));
        } else {
            inputElement.val(Math.min(currentValue + step, inputElement.attr('max') || 1000000));
        }

        // Trigger input event to perform calculations
        inputElement.trigger('input');
    } else {
        console.error('Invalid value or step attribute for ' + inputElement.attr('id'));
    }
}

$(document).ready(function() {
    $('#commonDurationYearSlider').on('input', function () {
        const sliderValue = $(this).val();
        $('#commonDurationYear').val(sliderValue).trigger('input'); // Trigger input event to perform calculations
        $(this).next('span').text(sliderValue); // Update the text of the next <span> element to display the current value
        
        // Call the appropriate calculation function
        if ($('#sip').is(':checked')) {
            calculateYearWiseSIP();
        } else {
            calculateYearWiseLumpSum();
        }
    });
});



// Attach mouse wheel event listener for all input fields
$('#commonPrincipal, #commonDurationYear, #commonDurationMonth, #commonRate').on('wheel', handleMouseWheel);

// Function to handle input events for all input fields
$('#commonPrincipal, #commonDurationYear, #commonDurationMonth, #commonRate').on('input', function () {
    $(this).next('span').text($(this).val());

    // Call the appropriate calculation function when any of these inputs change
    if ($('#sip').is(':checked')) {
        if ($('#commonDurationMonth').val() !== '') {
            calculateMonthWiseSIP();
        } else if ($('#commonDurationYear').val() !== '') {
            calculateYearWiseSIP();
        }
    } else {
        if ($('#commonDurationMonth').val() !== '') {
            calculateMonthWiseLumpSum();
        } else if ($('#commonDurationYear').val() !== '') {
            calculateYearWiseLumpSum();
        }
    }
});

// Function to handle input events for the sliders
$('#commonPrincipalSlider,#commonDurationYearSlider, #commonDurationMonthSlider, #commonRateSlider').on('input', function () {
    const inputId = $(this).attr('id').replace('Slider', '');
    $('#' + inputId).val($(this).val()).trigger('input');
    $(this).next('span').text($(this).val());
});




    // $('#sip, #lumpsum').change(function () {
    //     if ($('#sip').is(':checked')) {
    //         if ($('#commonDurationMonth').val() !== '') {
    //             calculateMonthWiseSIP();
    //         } else if ($('#commonDurationYear').val() !== '') {
    //             calculateYearWiseSIP();
    //         }
    //     } else {
    //         if ($('#commonDurationMonth').val() !== '') {
    //             calculateMonthWiseLumpSum();
    //         } else if ($('#commonDurationYear').val() !== '') {
    //             calculateYearWiseLumpSum();
    //         }
    //     }
    // });
    // $('#sip, #lumpsum').change(function () {
    //     if ($('#lumpsum').is(':checked')) {
    //         if ($('#commonDurationYear').val() !== '') {
    //             calculateYearWiseLumpSum();
    //         } else if ($('#commonDurationMonth').val() !== '') {
    //             calculateMonthWiseLumpSum();
    //         }
    //     } else {
    //         if ($('#commonDurationYear').val() !== '') {
    //             calculateYearWiseSIP();
    //         } else if ($('#commonDurationMonth').val() !== '') {
    //             calculateMonthWiseSIP();
    //         }
    //     }
    // });    


// Event handler for radio buttons (SIP and Lump Sum)
$('#sip, #lumpsum').change(function () {
    if ($('#lumpsum').is(':checked')) {
        if ($('#commonDurationYear').val() !== '') {
            calculateYearWiseLumpSum();
        } else if ($('#commonDurationMonth').val() !== '') {
            calculateMonthWiseLumpSum();
        }
    } else {
        if ($('#commonDurationYear').val() !== '') {
            calculateYearWiseSIP();
        } else if ($('#commonDurationMonth').val() !== '') {
            calculateMonthWiseSIP();
        }
    }
});

// Event handler for commonDurationMonth
$('#commonDurationMonth').change(function () {
    if ($('#sip').is(':checked')) {
        calculateMonthWiseSIP();
    } else {
        calculateMonthWiseLumpSum();
    }
});

// Event handler for commonDurationYear
$('#commonDurationYear').change(function () {
    if ($('#sip').is(':checked')) {
        calculateYearWiseSIP();
    } else {
        calculateYearWiseLumpSum();
    }
});

// Trigger calculation functions when the page loads
$(document).ready(function () {
    if ($('#sip').is(':checked')) {
        calculateMonthWiseSIP(); // or calculateYearWiseSIP();
    } else {
        calculateMonthWiseLumpSum(); // or calculateYearWiseLumpSum();
    }
});


  



});


