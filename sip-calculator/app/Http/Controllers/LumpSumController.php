<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
class LumpSumController extends Controller
{
    public function showCalculator()
    {
        return view('sip.calculator');
    }
    
    public function calculateLumpSum(Request $request)
    {        
        $lumpsumPrincipal = $request->input('lumpsumPrincipal');
        $lumpsumRate = $request->input('lumpsumRate');
        $lumpsumDuration = $request->input('lumpsumDuration');

        $totalInvestment = $lumpsumPrincipal;
        $monthlyInterestRate = ($lumpsumRate);    
            $totalValue = 0;

        for ($i = 1; $i <= $lumpsumDuration ; $i++) {
            $totalValue = $lumpsumPrincipal * pow(1 + ($monthlyInterestRate / 100),$lumpsumDuration);
        }

        $interestValue = $totalValue - $totalInvestment;

        return view('sip.calculator',['totalInvestment' => round($totalInvestment,0.60),'interestValue' => round($interestValue, 0.60),'totalValue' => round($totalValue, 0.60),]);
    }
}
