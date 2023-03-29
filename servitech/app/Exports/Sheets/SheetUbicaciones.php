<?php

namespace App\Exports\Sheets;

use App\Models\TipoProducto;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;

class SheetUbicaciones implements FromView, WithTitle, ShouldAutoSize {
    
    public function view(): View {
        $data = DB::table('ubicaciones')->get();
        return view('xlsx/Sheets/Ubicaciones', [
            'data' => $data,
        ]);
    }

    public function title(): string {
        return 'Ubicaciones';
    }

}

