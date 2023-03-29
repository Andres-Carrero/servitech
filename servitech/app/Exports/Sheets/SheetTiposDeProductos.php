<?php

namespace App\Exports\Sheets;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;

class SheetTiposDeProductos implements FromView, WithTitle, ShouldAutoSize {
    
    public function view(): View {
        $types = DB::table('tipo_productos')->get();
        return view('xlsx/Sheets/TipoDeProductos', [
            'types' => $types,
        ]);
    }

    public function title(): string {
        return 'Tipos';
    }

}
