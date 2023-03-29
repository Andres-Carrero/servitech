<?php

namespace App\Imports;

use App\Models\Imagenes;
use App\Models\Productos;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\HasReferencesToOtherSheets;

class SheetImagenes implements ToModel, WithHeadingRow, HasReferencesToOtherSheets {
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function model(array $row){
        $prod = Productos::where('prod_id', $row['codigo_de_producto'])->first();
        if(isset($prod) == true){
            $imgs = Imagenes::where('img_producto_id', $row['codigo_de_producto'])->get();
            if(count($imgs) < 6){
                $imgsValidate = Imagenes::where('img_producto_id', $row['codigo_de_producto'])->where('img_descripcion', $row['url'])->get();

                if(count($imgsValidate) == 0){
                    Imagenes::create([
                        'img_descripcion' => $row['url'],
                        'img_producto_id' => $row['codigo_de_producto']
                    ]);
                }
            }
        }
    }

}
