import { useShowcase } from "@/hooks/use-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export function GatheringTabs() {
  const { data } = useShowcase();
  const gatherings = data?.gatherings;

  if (!gatherings) return null;

  return (
    <section className="py-24 container mx-auto px-6">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Gatherings & Functions
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          Professional coverage for political rallies, corporate seminars, and
          traditional ceremonies.
        </p>
      </div>

      <Tabs defaultValue="corporate" className="w-full max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="corporate">Corporate</TabsTrigger>
            <TabsTrigger value="political">Political</TabsTrigger>
            <TabsTrigger value="traditional">Traditional</TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(gatherings).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-500">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-0 shadow-none"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] group overflow-hidden rounded-xl">
                      <img
                        src={item.src}
                        alt={category}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {category}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
