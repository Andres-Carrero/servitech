<?php

namespace App\Exports;

use App\Exports\Sheets\SheetEspecificaciones;
use App\Exports\Sheets\SheetImagenes;
use App\Exports\Sheets\SheetLineas;
use App\Exports\Sheets\SheetNivelPrioridad;
use App\Exports\Sheets\SheetProducts;
use App\Exports\Sheets\SheetTiposDeProductos;
use App\Exports\Sheets\SheetUbicaciones;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class XLSXProductos implements WithMultipleSheets
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function sheets(): array {
        $sheets = [];
        // Agregas las hojas
        array_push($sheets, new SheetProducts());
        array_push($sheets, new SheetImagenes());
        array_push($sheets, new SheetEspecificaciones());
        array_push($sheets, new SheetLineas());
        array_push($sheets, new SheetTiposDeProductos());
        array_push($sheets, new SheetUbicaciones());
        array_push($sheets, new SheetNivelPrioridad());

        return $sheets;
    }

}