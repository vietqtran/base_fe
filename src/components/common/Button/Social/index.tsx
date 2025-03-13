import { Button, ButtonProps } from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";
import { GoogleIcon } from '../../Icons/GoogleIcon';

export function GoogleButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button type='button' variant="default" {...props}>
      <GoogleIcon />
    </Button>
  );
}

export function GithubButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button type='button' {...props} className="githubButton">
      <GithubIcon size={16} />
    </Button>
  );
}
