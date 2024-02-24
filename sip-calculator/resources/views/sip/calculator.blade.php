<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIP Calculator</title>
    <link rel="stylesheet" href="{{asset('cssfile/style.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>

<body>
    <div id="container">
        <div class="calculator">
            <div class="container mt-5">
                <div class="tab">
                    <div>
                        <input type="radio" id="sip" name="calcType" checked>
                        <label for="sip" onclick="showCalculator('sipCalculator')">SIP</label>
                        <input type="radio" id="lumpsum" name="calcType">
                        <label for="lumpsum" onclick="showCalculator('lumpsumCalculator')">LumpSum</label>
                    </div>
                </div>
                <div class="tab-content mt-2">
                    <div id="sipCalculator" class="tab-pane fade show active">
                        <div class="sip">
                            <div id="sipInputs" class="sip-body">
                                <div class="header">
                                    <h1>SIP Calculator</h1>
                                </div>
                                <form id="sipForm" action="{{ route('sip.calculate') }}" method="POST">
                                    @csrf
                                </form>
                            </div>
                        </div>
                    </div>

                    <div id="lumpsumCalculator" class="tab-pane fade">
                        <div class="lumpsum">

                            <div id="lumpsumInputs" class="lumpsum-body">
                                <div class="header">
                                    <h1>Lumpsum Calculator</h1>
                                </div>
                                <form id="lumpsumForm" action="{{ route('lumpsum.calculate') }}" method="POST">
                                    @csrf
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="form">
                        <div class="form-group">
                            <div class="input">
                                <div class="input-1">Investment</div>
                                <div class="input-2">
                                    <div class="input-group input-3">
                                        <span class="input-group-text">₹</span>
                                        <input type="number" class="form-control" name="commonPrincipal"
                                            id="commonPrincipal" min="0" value="1000" step="1">
                                        </div>
                                </div>
                            </div>
                            <input type="range" class="form-range" id="commonPrincipalSlider" min="1000" max="100000"
                                step="1000" value="1000">
                        </div>
                        <div class="form-group">
                            <div class="input">
                                <div class="input-1">Time Period</div>
                                <div class="input-2">
                                    <div class="input-group input-3">
                                        <span class="input-group-text">Yr</span>
                                        <input type="number" class="form-control" name="commonDurationYear" id="commonDurationYear" min="0" value="0" step="1" required>
                                    </div>
                                </div>
                            </div>
                            <input type="range" class="form-range" id="commonDurationYearSlider" min="1" max="30" value="0" step="1">
                        </div>
                        <div class="form-group">
                            <div class="input">
                                <div class="input-1">Time Period</div>
                                <div class="input-2">
                                    <div class="input-group input-3">
                                        <span class="input-group-text">Mth</span>
                                        <input type="number" class="form-control" name="commonDurationMonth" id="commonDurationMonth" min="0"  value="0" step="1">
                                    </div>
                                </div>
                            </div>
                            <input type="range" class="form-range" id="commonDurationMonthSlider" min="1" max="30" value="0" step="1">
                        </div>
                        <div class="form-group">
                            <div class="input">
                                <div class="input-1">Annual Interest Rate</div>
                                <div class="input-2">
                                    <div class="input-group input-3">
                                        <span class="input-group-text">%</span>
                                        <input type="number" class="form-control" id="commonRate" min="1" value="1" step="1">
                                    </div>
                                </div>
                            </div>
                            <input type="range" class="form-range" id="commonRateSlider" min="1" max="30" value="1">
                        </div>
                    </div>
                    <div class="summary">
                        <h2> Summary</h2>
                        <h5>Total Investment: <span id="totalInvestment">0</span></h5>
                        <h5>Estimated Returns: <span id="interestValue">0</span></h5>
                        <h5>Future Value: <span id="totalValue">0</span></h5>
                    </div>

                 
                </div>
            </div>
            <div id="chartdiv" style="position: relative;">
                <canvas id="chartdiv" height="200px" width="200px"></canvas>
            </div>
            <div id="chartDataTable"></div>

        </div>
    </div>


    


    <script>
        function showCalculator(calculatorId) {
            const calculatorElement = document.getElementById(calculatorId);
            if (!calculatorElement) {
                console.error(`Element with ID '${calculatorId}' not found.`);
                return;
            }

            // Add 'active' class to the clicked button (if found)
            const calculatorBtn = document.getElementById(calculatorId + 'Btn');
            if (calculatorBtn) {
                calculatorBtn.classList.add('active');
            }

            // Show the selected calculator content
            calculatorElement.classList.add('show', 'active');

            // Hide other calculator contents
            document.querySelectorAll('.tab-pane').forEach(content => {
                if (content.id !== calculatorId) {
                    content.classList.remove('show', 'active');
                }
            });
        }

        document.getElementById('sip').addEventListener('click', function () { showCalculator('sipCalculator'); });

        document.getElementById('lumpsum').addEventListener('click', function () { showCalculator('lumpsumCalculator'); });



        
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery"></script>
    <script src="{{asset('script/script.js')}}"></script>
</body>

</html>