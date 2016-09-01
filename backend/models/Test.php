<?php

namespace backend\models;

use Yii;

/**
 * This is the model class for table "test".
 *
 * @property string $id
 * @property string $name_test
 * @property string $desc_test
 * @property integer $number_test
 */
class Test extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'test';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name_test', 'desc_test', 'number_test'], 'required'],
            [['desc_test'], 'string'],
            [['number_test'], 'integer'],
            [['name_test'], 'string', 'max' => 64],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name_test' => 'Name Test',
            'desc_test' => 'Desc Test',
            'number_test' => 'Number Test',
        ];
    }
}
