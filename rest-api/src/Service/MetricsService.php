<?php
namespace App\Service;

use InfluxDB\Database;
use InfluxDB\Point;

/**
 * Class for managing database
*/
class MetricsService
{
    const TEMP_METRIC = 'temperature';

    const GROUP_VALUES = [
        'min' => '1m',
        'hour' => '1h',
        'day' => '1d',
    ];

    protected $database;

    public function __construct(Database $database)
    {
        $this->database = $database;
    }

    /**
     * Get points
     * @return array Array of points
     */
    public function getPoints():array
    {
        $query = 'select * from ' . self::TEMP_METRIC . ' order by time DESC';
        $result = $this->database->query($query);
        $points = $result->getPoints();
        return $points;
    }

    /**
     * Get points grouped by time
     * @return array Array of points
     */
    public function getGroupedPoints(string $group):array
    {
        $groupTime = $this->getGroupTime($group);

        $query = 'select mean(value) as value from ' . self::TEMP_METRIC . " group by time($groupTime) order by time DESC";
        $result = $this->database->query($query);
        $points = $result->getPoints();
        return $points;
    }

    public function getGroupTime(string $group):string
    {
        return array_key_exists($group, self::GROUP_VALUES) ? self::GROUP_VALUES[$group] : self::GROUP_VALUES['day'];
    }

    /**
     * Create a new point
     * @return bool True if point is created
     */
    public function createPoints(int $temp):bool
    {
        $result = $this->database->writePoints([new Point(
            self::TEMP_METRIC,
            $temp
        )]);

        return $result;
    }
}
