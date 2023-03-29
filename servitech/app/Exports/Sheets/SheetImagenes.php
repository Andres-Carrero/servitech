<?php

namespace App\Exports\Sheets;

use App\Models\Imagenes;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;

class SheetImagenes implements FromView, WithTitle, ShouldAutoSize {
    
    public function view(): View {
        return view('xlsx/Sheets/Imagenes', [
           'data' => Imagenes::all()
        ]);
    }

    public function title(): string {
        return 'Carga de Imagenes';
    }

}
