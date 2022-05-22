<?php
namespace App\Tests\Service;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use App\Service\MetricsService;

class MetricsServiceTest extends KernelTestCase
{
    // Clean DB before and after tests

    /**
     * Test getPoints function
     * Result: array of points
     */
    public function testGetPoints()
    {
        self::bootKernel();

        $metricsService = (static::getContainer())->get(MetricsService::class);
        $points = $metricsService->getPoints();

        $this->assertNotNull($points, 'Service returns points');
    }

    /**
     * Test createPoint function
     * Result: boolean
     */
    public function testCreatePoint()
    {
        self::bootKernel();

        $metricsService = (static::getContainer())->get(MetricsService::class);
        $points = $metricsService->createPoints(32);

        $this->assertTrue($points, 'Service has created point');
    }
}