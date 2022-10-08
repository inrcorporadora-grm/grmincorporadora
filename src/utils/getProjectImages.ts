import { iProject } from 'types/iProject';
import { getImages } from './getImages';
import { urlToDataUrl } from './urlToDataUrl';

export async function getProjectImages(project: iProject) {
  const newProject = project;

  const image = await getImages(`projects/${project?.id}`);
  const plansImages = await getImages(`projects/${project?.id}/plans`);
  const galleryImages = await getImages(`projects/${project?.id}/gallery`);
  const illustrativeImages = await getImages(
    `projects/${project?.id}/illustrative`,
  );
  await urlToDataUrl(image[0]?.url).then((dataUrl) => {
    newProject.image = { ...project.image, url: dataUrl };
  });
  if (image[1]) {
    await urlToDataUrl(image[1]?.url).then((dataUrl) => {
      newProject.image = { ...project.image, urlMobile: dataUrl };
    });
  }

  const plans =
    project.plans &&
    (await Promise.all(
      project.plans.map(async (plan) => {
        const newPlan = plan;
        const i = plansImages.findIndex((item) => item.path.includes(plan.id));
        await urlToDataUrl(plansImages[i]?.url).then((base64) => {
          newPlan.url = base64;
        });
        return newPlan;
      }),
    ));
  const gallery =
    project.gallery &&
    (await Promise.all(
      project.gallery.map(async (galleryImage) => {
        const newGalleryImage = galleryImage;
        const i = galleryImages.findIndex((item) =>
          item.path.includes(galleryImage.id),
        );
        await urlToDataUrl(galleryImages[i]?.url).then((base64) => {
          newGalleryImage.url = base64;
        });

        return newGalleryImage;
      }),
    ));
  const illustrative =
    project.illustrative &&
    (await Promise.all(
      project.illustrative.map(async (illustrativeImage) => {
        const newIllustrativeImage = illustrativeImage;
        const i = illustrativeImages.findIndex((item) =>
          item.path.includes(illustrativeImage.id),
        );
        await urlToDataUrl(illustrativeImages[i].url).then((base64) => {
          newIllustrativeImage.url = base64;
        });

        return newIllustrativeImage;
      }),
    ));

  return {
    ...newProject,
    plans,
    gallery,
    illustrative,
  } as iProject;
}
