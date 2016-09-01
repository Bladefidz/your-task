<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "task".
 *
 * @property integer $Id
 * @property integer $_Order
 * @property integer $Done
 * @property string $Text
 * @property string $Date
 */
class Task extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'task';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['_Order', 'Done'], 'required'],
            [['_Order', 'Done'], 'integer'],
            [['Date'], 'safe'],
            [['Text'], 'string', 'max' => 64],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'Id' => 'ID',
            '_Order' => 'Order',
            'Done' => 'Done',
            'Text' => 'Text',
            'Date' => 'Date',
        ];
    }
}
