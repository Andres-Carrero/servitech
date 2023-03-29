<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ProductsLoad implements WithMultipleSheets 
{
    public function sheets(): array
    {
        return [
            0 => new SheetProducts(),
            1 => new SheetImagenes(),
            2 => new SheetEspecificaciones(),
        ];
    }
}
