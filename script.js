$(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  $('#links a').each(function () { if ($(this).attr('href') === page) $(this).addClass('active'); });
  $('#menu').click(function () { $('#links').slideToggle(200); });
  try { if (localStorage.getItem('dark') === '1') $('body').addClass('dark'); } catch (e) {}
  $('#theme').click(function () { $('body').toggleClass('dark'); try { localStorage.setItem('dark', $('body').hasClass('dark') ? '1' : '0'); } catch (e) {} });

  // typing effect
  var words = ['CSE Student', 'Aspiring SDE', 'AI / ML Enthusiast', 'IEEE Paper Author'], w = 0, c = 0, del = false;
  (function type() {
    if (!$('#typed').length) return;
    var s = words[w]; c += del ? -1 : 1; $('#typed').text(s.slice(0, c));
    if (!del && c === s.length) { del = true; return setTimeout(type, 1200); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    setTimeout(type, del ? 50 : 100);
  })();

  // scroll progress, back-to-top, reveal on scroll, counters, skill bars
  $('.card,.item,section,.bio,.resume aside').addClass('reveal');
  function onScroll() {
    var st = $(window).scrollTop(), h = $(document).height() - $(window).height();
    $('#bar').css('width', (h ? st / h * 100 : 0) + '%'); $('#top').toggle(st > 200);
    $('.reveal:not(.show)').each(function () {
      if ($(this).offset().top < st + $(window).height() - 40) {
        $(this).addClass('show');
        $(this).find('[data-count]').addBack('[data-count]').each(count);
        $(this).find('.skill').each(function () { $(this).find('i').css('width', $(this).data('level') + '%'); });
      }
    });
  }
  function count() {
    var el = $(this), t = +el.data('count'), d = el.data('dec') || 0;
    $({ n: 0 }).animate({ n: t }, { duration: 1500, step: function (v) { el.text(v.toFixed(d)); }, complete: function () { el.text(t.toFixed(d)); } });
  }
  $(window).on('scroll resize', onScroll); onScroll();
  $('#top').click(function () { $('html,body').animate({ scrollTop: 0 }, 400); });

  // project filter
  $('.f').click(function () {
    $('.f').removeClass('on'); $(this).addClass('on'); var f = $(this).data('f');
    $('.pj').each(function () { $(this).toggle(f === 'all' || $(this).data('t') === f); });
  });

  // contact form validation
  $('#cform').submit(function (ev) {
    ev.preventDefault(); var ok = true; $('#n,#e,#m').removeClass('err');
    if ($('#n').val().trim().length < 2) { $('#n').addClass('err'); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#e').val())) { $('#e').addClass('err'); ok = false; }
    if ($('#m').val().trim().length < 10) { $('#m').addClass('err'); ok = false; }
    $('#msg').attr('class', ok ? 'ok' : 'bad').text(ok ? 'Thanks! Your message has been recorded.' : 'Please fix the highlighted fields.');
    if (ok) this.reset();
  });
});
