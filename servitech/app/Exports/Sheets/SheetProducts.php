<?php

namespace App\Exports\Sheets;

use App\Models\Productos;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;

class SheetProducts implements FromView, WithTitle, ShouldAutoSize {
    
    public function view(): View {
        return view('xlsx/productos', [
           'data' => Productos::all()
        ]);
    }

    public function title(): string {
        return 'Carga de Productos';
    }

}