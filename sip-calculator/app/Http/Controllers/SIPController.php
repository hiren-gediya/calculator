<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SIPController extends Controller
{
    public function showCalculator()
    {
        return view('sip.calculator');
    }
    
    public function getSipData(Request $request)
{
    try {
        // Retrieve input data
        $monthlyInvestment = $request->input('monthlyInvestment');
        $investmentDuration = $request->input('investmentDuration');
        $annualInterestRate = $request->input('annualInterestRate');

        // Initialize variables
        $totalInvestment = $monthlyInvestment * 12 * $investmentDuration;
        $monthlyInterestRate = ($annualInterestRate / 100) / 12;
        $totalValue =0 ;

        // Perform SIP calculations
        for ($i = 1; $i <= $investmentDuration * 12; $i++) {
            $totalValue += $monthlyInvestment * pow(1 + $annualInterestRate, $i);
        }

        // Calculate interest value
        $interestValue = $totalValue - $totalInvestment;

        return view('sip.calculator', [
    'data' => json_encode([
        'totalInvestment' => round($totalInvestment, 0.60),
        'interestValue' => round($interestValue, 0.60),
        'totalValue' => round($totalValue, 0.60),
    ]),
]);
        
    } catch (\Exception $e) {
        // Log the exception
        \Log::error('Exception in getSipData: ' . $e->getMessage());

        // Return a generic error response
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}
}



   