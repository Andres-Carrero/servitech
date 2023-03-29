<?php

namespace App\Exports\Sheets;

use App\Models\Especificaciones;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;

class SheetEspecificaciones implements FromView, WithTitle, ShouldAutoSize {
    
    public function view(): View {
        return view('xlsx/Sheets/Especificaciones', [
           'data' => Especificaciones::all()
        ]);
    }

    public function title(): string {
        return 'Carga de Especificaciones';
    }

}