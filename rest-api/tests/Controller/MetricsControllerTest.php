<?php
namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\JsonResponse;

class MetricsControllerTest extends WebTestCase
{
    // Clean DB before and after tests

    /**
     * Test GET request
     * Result: successful response
     */
    public function testGetMetrics()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/metrics');

        $this->assertResponseIsSuccessful();
    }

    /**
     * Test POST request for creating points
     * Result: successful response
     */
    public function testPostMetrics()
    {
        $client = static::createClient();
        $crawler = $client->request('POST', '/metrics', [], [], [], json_encode(['temp' => 32]));

        $this->assertResponseIsSuccessful();
    }

    /**
     * Test POST request for creating points
     * Result: successful response
     */
    public function testPostMetricsBadRequest()
    {
        $client = static::createClient();
        $crawler = $client->request('POST', '/metrics', [], [], [], json_encode(['temperature' => 32]));

        $this->assertResponseStatusCodeSame(JsonResponse::HTTP_BAD_REQUEST);
    }

    // Test Exception case
    // public function testPostMetricsExceptions()
    // {
    // }
}