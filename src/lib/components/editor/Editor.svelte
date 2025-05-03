<article>
	Hello World
</article>

<style lang="scss">
  @use '../../styles/mixins/stylo';
  @use '../../styles/mixins/doc';

	article {
    @include stylo.editor;
    @include doc.article;
    @include doc.placeholder;
	}
</style>