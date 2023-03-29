<?php

namespace App\Exports\Sheets;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;

class SheetNivelPrioridad implements FromView, WithTitle, ShouldAutoSize {
    
    public function view(): View {
        $data = [
            ['id' => 5, 'value' => 'Superior'],
            ['id' => 4, 'value' => 'Alto'],
            ['id' => 3, 'value' => 'Medio'],
            ['id' => 2, 'value' => 'Baja'],
            ['id' => 1, 'value' => 'Insignificante'],
            ['id' => '0', 'value' => 'Ninguna'],
        ];
        return view('xlsx/Sheets/NivelDePrioridad', [
            'data' => $data,
        ]);
    }

    public function title(): string {
        return 'Niveles de Prioridad';
    }

}
