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
    public function getGroupedPoints():array
    {
        $query = 'select sum(value) as value from ' . self::TEMP_METRIC . ' group by time(1d) order by time DESC';
        $result = $this->database->query($query);
        $points = $result->getPoints();
        return $points;
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
