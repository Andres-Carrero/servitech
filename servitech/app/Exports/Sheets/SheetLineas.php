<?php

namespace App\Exports\Sheets;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;

class SheetLineas implements FromView, WithTitle, ShouldAutoSize {
    
    public function view(): View {
        $data = [
            ['id' => 1, 'value' => 'Accesorios'],
            ['id' => 2, 'value' => 'Partes'],
            ['id' => 3, 'value' => 'Ensablados'],
        ];
        return view('xlsx/Sheets/Lineas', [
            'data' => $data,
        ]);
    }

    public function title(): string {
        return 'Lineas';
    }

}
