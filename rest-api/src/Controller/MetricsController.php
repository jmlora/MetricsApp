<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Annotation\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\MetricsService;

class MetricsController extends AbstractController
{
    protected $metricsService;

    public function __construct(MetricsService $metricsService)
    {
        $this->metricsService = $metricsService;
    }

    /**
     * @Route("/metrics", name="metrics_list", methods={"GET"})
     */
    public function cget(Request $request):JsonResponse
    {
        $points = [];

        if ($request->query->get('groupBy')) {
            $points = $this->metricsService->getGroupedPoints(true);
        } else {
            $points = $this->metricsService->getPoints(true);
        }

        return $this->json($points);
    }

    /**
     * @Route("/metrics", name="metrics_create", methods={"POST"})
     */
    public function post(Request $request):JsonResponse
    {
        try {
            $body = json_decode($request->getContent(), true);

            if (!array_key_exists('temp', $body)) {
                return new JsonResponse(['error' => "Parameter 'temp' is required"], JsonResponse::HTTP_BAD_REQUEST);
            }

            $result = $this->metricsService->createPoints($body['temp']);
            return $this->json(['result' => $result]);

        } catch (\Exception $exc) {
            // Log error
            return $this->json([
                'result' => false,
                'error' => 'Error creating points']);
        }
    }
}
